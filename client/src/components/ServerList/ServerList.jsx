// * DEPENDENCIES * //
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getAllGuilds, createGuild } from '../../features/guilds/guildsSlice';
import { setCurrentTab } from '../../features/currentTab/currentTabSlice';

// * COMPONENTS * //
import Button from '../Button';
import Input from '../../components/Input/Input';
import Modal from '../Modal/Modal';
import { ServerIcon, HomeIcon, CreateServerIcon } from '../ServerIcon';
import { Separator } from '../Separator';

// * STYLES * //
import './ServerList.scss';

// * ICONS * //
import { GiSteelwingEmblem } from 'react-icons/gi';
import { BsPlusLg } from 'react-icons/bs';

const ServerList = () => {
    const dispatch = useDispatch();
    const { guilds } = useSelector((state) => state.guilds);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guildName, setGuildName] = useState('');
    const [guildIcon, setGuildIcon] = useState('');

    const handleImage = (files) => {
        const file = files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setGuildIcon(reader.result);
        };
    };

    const handleSubmit = () => {
        const guildData = {
            name: guildName,
            icon: guildIcon
        };

        dispatch(createGuild(guildData));
        dispatch(getAllGuilds());
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(getAllGuilds());
    }, []);

    return (
        <>
            <Modal
                isModalOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title={'Create a new server'}
                action={'Create'}
                handleSubmit={handleSubmit}
            >
                <Input
                    type={'file'}
                    label={'Image'}
                    required={false}
                    onChange={(e) => handleImage(e.target.files)}
                ></Input>
                <Input
                    type={'text'}
                    label={'Name of the server'}
                    required={true}
                    onChange={(e) => setGuildName(e.target.value)}
                    guildName={guildName}
                ></Input>
            </Modal>

            <div className="Server-list-wrapper">
                <aside className="Server-list">
                    <HomeIcon
                        onClick={() =>
                            dispatch(
                                setCurrentTab({
                                    currentTab: 'home',
                                    options: null
                                })
                            )
                        }
                        style={{ marginBottom: '10px' }}
                    >
                        <GiSteelwingEmblem />
                    </HomeIcon>
                    {guilds.length > 0 ? <Separator width="40%" /> : null}
                    <div className="servers">
                        {guilds?.map((guild) => {
                            return (
                                <ServerIcon
                                    key={guild._id}
                                    guild={guild.icon}
                                />
                            );
                        })}
                    </div>
                    {guilds.length > 0 ? <Separator width="40%" /> : null}
                    <CreateServerIcon onClick={() => setIsModalOpen(true)}>
                        <BsPlusLg />
                    </CreateServerIcon>
                </aside>
            </div>
        </>
    );
};

export default ServerList;
