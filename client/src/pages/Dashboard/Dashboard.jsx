// * DEPENDENCIES * //
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    const { currentTab, options } = useSelector((state) => state.currentTab);

    useEffect(() => {
        if (!user) return navigate('/login');
        dispatch(getUserFriends());
        dispatch(reset());
    }, [currentTab]);

    useEffect(() => {
        if (!user) return navigate('/login');
        connectSocket(user);
    }, []);

    return (
        <div className="Dashboard">
            <ServerList />
            <Sidebar />

            <div className="Main-app">
                {currentTab === 'home' && <FriendsTab />}
                {currentTab === 'friends' && <FriendsTab />}
                {currentTab === 'conversation' && (
                    <Conversation friendID={options} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
