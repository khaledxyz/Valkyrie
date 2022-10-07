// * DEPENDENCIES * //
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getAllGuilds, createGuild } from '../../features/guilds/guildsSlice';

// * COMPONENTS * //
import { ServerIcon, HomeIcon, CreateServerIcon } from '../ServerIcon';
import Input from '../../components/Input/Input';
import Modal from '../Modal/Modal';
import Separator from '../Separator';

// * STYLES * //
import './ServerList.scss';

// * ICONS * //
import { GiSteelwingEmblem } from 'react-icons/gi';
import { BsPlusLg } from 'react-icons/bs';

const ServerList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { guilds } = useSelector(state => state.guilds);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guildName, setGuildName] = useState(null);
    const [guildIcon, setGuildIcon] = useState(null);

    const handleImage = (files) => {
        const file = files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { setGuildIcon(reader.result) };
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
        name = name.toString().split(' ');
        if (!name[1]) return name[0].charAt(0);
        name = name.shift().charAt(0) + name.pop().charAt(0);
        return name;
    };

    const isActive = (guildID) => {
        const path = location.pathname.replace('/channels/', '');

        if (path.includes(guildID)) return 'active';
        if (path.includes('@me') && guildID === 'home') return 'active';
        return;
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
                        style={{ marginBottom: '10px' }}
                        className={isActive('home')}
                        onClick={() => navigate('@me')}
                    >
                        <GiSteelwingEmblem />
                    </HomeIcon>
                    {guilds.length > 0 ? <Separator width="40%" /> : null}
                    <div className="servers">{
                        guilds?.map((guild) => (
                            <ServerIcon
                                key={guild._id}
                                icon={guild.icon}
                                initials={getInitials(guild.name)}
                                className={isActive(guild._id)}
                                onClick={() => navigate(guild._id)}
                            />
                        ))
                    }</div>
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
