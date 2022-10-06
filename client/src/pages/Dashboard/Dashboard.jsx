// * DEPENDENCIES * //
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

// * REDUX SLICE * //
import { getUserFriends } from '../../features/friends/friendsSlice';
import { reset } from '../../features/conversation/conversationSlice';

// * SOCKET CONTEXT * //
import { SocketContext, socket } from '../../context/socket';

// * COMPONENTS * //
import ServerList from '../../components/ServerList/ServerList';
import Sidebar from '../../components/Sidebar/Sidebar';
import FriendsTab from '../../components/FriendsTab/FriendsTab';
import Conversation from '../../components/Conversation/Conversation';
import GuildConversation from '../../components/Conversation/GuildConversation';

// * STYLES * //
import './Dashboard.scss';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) return navigate('/login');
        dispatch(getUserFriends());
        dispatch(reset());

        socket.emit('USER_ONLINE', user);
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <div className="Dashboard">
                <ServerList />
                <Sidebar />

                <div className="Main-app">
                    <Routes>
                        <Route path={':guildID/:channelID'} element={<GuildConversation />} />
                        <Route path={'@me/:friendID'} element={<Conversation />} />
                        <Route path={'@me'} element={<FriendsTab />} />
                    </Routes>
                </div>
            </div>
        </SocketContext.Provider>
    );
};

export default Dashboard;
