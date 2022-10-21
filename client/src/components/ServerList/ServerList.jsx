// * DEPENDENCIES * //
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid'
import toast, { Toaster } from 'react-hot-toast';

// * REDUX SLICE * //
import { getAllGuilds, createGuild, deleteGuild, reset } from '../../features/guilds/guildsSlice';
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

    const { guilds, success } = useSelector(state => state.guilds);
    const { user } = useSelector(state => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState(false);
    const [guildName, setGuildName] = useState(null);
    const [guildIcon, setGuildIcon] = useState(null);
    const [guildIconSize, setGuildIconSize] = useState();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [contextData, setContextData] = useState();
    const maxSize = 2.1; //mb

    const handleImage = (files) => {
        const file = files[0];
        setGuildIconSize(file.size);

        if (file.size / 1000000 > maxSize) {
            toast.error('The image is too big!');
            return;
        };

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { setGuildIcon(reader.result) };
    };

    const handleSubmit = () => {
        if (!guildName) {
            toast.error('Please enter a name.');
            return;
        };

        if (guildIconSize / 1000000 > maxSize) {
            toast.error('The image is too big!');
            return;
        };

        const guildData = {
            name: guildName,
            icon: guildIcon
        };

        dispatch(createGuild(guildData));
        setGuildIcon(null);
        setGuildName(null);
    };

    const deleteLeave = () => {
        if (contextData.owner === user.details._id) {
            dispatch(deleteGuild(contextData));
            return;
        };

        dispatch(leaveGuild());
    };

    const handleContextMenu = (e, guildID) => {
        e.preventDefault();
        setContextMenu(true);
        const guild = guilds.find(guild => guild._id === guildID);
        setContextData(guild);
        setPosition({ x: e.pageX, y: e.pageY });
    };

    const inviteFriends = () => {
        const inviteObj = {
            guildID: contextData._id,
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

    useEffect(() => {
        if (success) {
            dispatch(reset());
            setIsModalOpen(false);
            navigate(`/channels/${guilds[guilds.length - 1]._id}`);
        };
    }, [success]);

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
                    label={`Image - max size ${Math.trunc(+maxSize)}MB`}
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
                <ContextItem onClick={() => navigator.clipboard.writeText(contextData._id)}>Copy ID</ContextItem>
                <Separator />
                <ContextItem variant={'danger'} onClick={deleteLeave} >{contextData?.owner === user.details._id ? 'Delete Server' : 'Leave Server'}</ContextItem>
            </ContextMenu>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{ style: { backgroundColor: '#14151e', color: '#fff', fontSize: '0.8rem' } }}
            />

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
