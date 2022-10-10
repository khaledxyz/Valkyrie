// * DEPENDENCIES * //
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// * REDUX SLICE * //
import { fetchFriends } from '../../features/friends/friendsSlice';
import { reset } from '../../features/conversation/conversationSlice';
import { SocketContext, socket } from '../../context/SocketContext';

// * COMPONENTS * //
import ServerList from '../../components/ServerList/ServerList';
import Sidebar from '../../components/Sidebar/Sidebar';
import FriendsTab from '../../components/FriendsTab/FriendsTab';
import Conversation from '../../components/Conversation/Conversation';
import GuildConversation from '../../components/Conversation/GuildConversation';

const StyledDashboard = styled.div`
    display: flex;

    width: 100vw;
    height: 100vh;

    .app {
        width: 100%;
        height: 100VH;
        background-color: var(--down-river);
    }

    .notification{
        z-index: 1;
        position: absolute;

        font-size: 0.7rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;

        top: 55px;
        left: 45px;

        width: 15px;
        height: 15px;

        border-radius: 50%;
        background-color: var(--error-danger);
        outline: 5px solid var(--ebony);
    }
`

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notificationAudio = new Audio('/notification.mp3');

    const socket = useContext(SocketContext);
    const { user } = useSelector(state => state.auth);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.emit('join', user.details._id);

        socket.on('received_message_notification', (message) => {
            setNotifications(notifications => [...notifications, message]);
            notificationAudio.play();
        });

        return () => {
            socket.off('received_message_notification');
        };
    }, [socket, user]);

    useEffect(() => {
        console.log(notifications)
    }, [notifications])

    useEffect(() => {
        if (!user) return navigate('/login');
        dispatch(fetchFriends());
        dispatch(reset());
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <StyledDashboard>
                {notifications.length > 0 && <div className="notification">{notifications.length}</div>}
                <ServerList />
                <Sidebar />

                <div className="app">
                    <Routes>
                        <Route path={':guildID/:channelID'} element={<GuildConversation />} />
                        <Route path={'@me/:friendID'} element={<Conversation />} />
                        <Route path={'@me'} element={<FriendsTab />} />
                    </Routes>
                </div>
            </StyledDashboard>
        </SocketContext.Provider>
    );
};

export default Dashboard;
