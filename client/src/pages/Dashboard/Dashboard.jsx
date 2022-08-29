// * DEPENDENCIES * //
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { connectSocket } from '../../socket/socket';

// * REDUX SLICE * //
import { getUserFriends } from '../../features/friends/friendsSlice';
import { reset } from '../../features/conversation/conversationSlice';

// * COMPONENTS * //
import ServerList from '../../components/ServerList/ServerList';
import Sidebar from '../../components/Sidebar/Sidebar';
import FriendsTab from '../../components/FriendsTab/FriendsTab';
import Conversation from '../../components/Conversation/Conversation';

// * STYLES * //
import './Dashboard.scss';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    useEffect(() => {
        if (!user) return navigate('/login');
        dispatch(getUserFriends());
        dispatch(reset());
    }, []);

    useEffect(() => {
        if (!user) return navigate('/login');
        connectSocket(user);
    }, []);

    return (
        <div className="Dashboard">
            <ServerList />
            <Sidebar />

            <div className="Main-app">
                <Routes>
                    <Route path={'@me/:friendID'} element={<Conversation />} />
                    <Route path={'@me'} element={<FriendsTab />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
