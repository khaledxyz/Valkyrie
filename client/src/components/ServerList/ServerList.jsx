// * DEPENDENCIES * //
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getAllGuilds, createGuild } from '../../features/guilds/guildsSlice';
import { setCurrentTab } from '../../features/currentTab/currentTabSlice';

// * COMPONENTS * //
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
    const { guilds, isLoading } = useSelector((state) => state.guilds);
    const { currentTab, options } = useSelector((state) => state.currentTab);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guildName, setGuildName] = useState(null);
    const [guildIcon, setGuildIcon] = useState(null);

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
        setGuildIcon(null);
        setGuildName(null);
        dispatch(getAllGuilds());
    };

    const getInitials = (name) => {
        name = name.split(' ');
        if (!name[1]) return name[0].charAt(0);
        name = name.shift().charAt(0) + name.pop().charAt(0);
        return name;
    };

    const isActive = (guildID) => {
        if (currentTab === 'home' && options === guildID) return 'active';
        if (currentTab === 'guild' && options === guildID) return 'active';
        return null
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
                        onClick={() => dispatch(setCurrentTab({ currentTab: 'home', options: null }))}
                        style={{ marginBottom: '10px' }}
                        className={isActive(null)}
                    >
                        <GiSteelwingEmblem />
                    </HomeIcon>
                    {guilds.length > 0 ? <Separator width="40%" /> : null}
                    <div className="servers">
                        {guilds?.map((guild) => {
                            return (
                                <ServerIcon
                                    key={guild._id}
                                    icon={guild.icon}
                                    initials={getInitials(guild.name)}
                                    onClick={() => dispatch(setCurrentTab({ currentTab: 'guild', options: guild._id }))}
                                    className={isActive(guild._id)}
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
