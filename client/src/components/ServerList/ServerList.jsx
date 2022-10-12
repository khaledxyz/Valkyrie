// * DEPENDENCIES * //
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid'

// * REDUX SLICE * //
import { getAllGuilds, createGuild } from '../../features/guilds/guildsSlice';
import { createInvite } from '../../features/invites/invitesSlice';

// * COMPONENTS * //
import { ServerIcon, HomeIcon, CreateServerIcon } from '../ServerIcon';
import Input from '../../components/Input/Input';
import Modal from '../Modal/Modal';
import Separator from '../Separator';
import ContextMenu, { ContextItem } from '../ContextMenu';

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
    const [contextMenu, setContextMenu] = useState(false);
    const [guildName, setGuildName] = useState(null);
    const [guildIcon, setGuildIcon] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [contextData, setContextData] = useState();

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

    const handleContextMenu = (e, guildID) => {
        e.preventDefault();
        setContextMenu(true);
        setContextData(guildID);
        setPosition({ x: e.pageX, y: e.pageY });
    };

    const inviteFriends = () => {
        const inviteObj = {
            guildID: contextData,
            invite: nanoid(10)
        };

        const inviteLink = `${window.location.origin}/invite/${inviteObj.invite}`;
        navigator.clipboard.writeText(inviteLink);
        dispatch(createInvite(inviteObj));
    };

    useEffect(() => {
        const handleClick = () => setContextMenu(false);
        addEventListener('click', handleClick);
        return () => addEventListener('click', handleClick);
    }, []);

    const getInitials = (name) => {
        name = name.split(' ');
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

    useEffect(() => { dispatch(getAllGuilds()) }, []);

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

            <ContextMenu
                contextMenu={contextMenu}
                position={position}
            >
                <ContextItem onClick={() => inviteFriends()}>Invite Friends</ContextItem>
                <ContextItem onClick={() => navigator.clipboard.writeText(contextData)}>Copy ID</ContextItem>
            </ContextMenu>

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
                                onContextMenu={(e) => handleContextMenu(e, guild._id)}
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
