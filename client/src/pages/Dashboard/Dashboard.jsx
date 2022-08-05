// * DEPENDENCIES * //
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
// * REDUX SLICE * //
import { getAllGuilds } from '../../features/guilds/guildsSlice';
import { getAllFriends } from '../../features/Friends/FriendsSlice';

// * COMPONENTS * //
import ServerList from "../../components/ServerList/ServerList";
import Sidebar from '../../components/Sidebar/Sidebar';
import FriendsTab from '../../components/FriendsTab/FriendsTab';
import Conversation from '../../components/Conversation/Conversation';

// * STYLES * //
import './Dashboard.scss';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    useEffect(() => {
        if(!user) navigate('/login');
        // dispatch(getAllGuilds());
        dispatch(getAllFriends());
    }, []);

    return ( 
        <div className='Dashboard'>
            <ServerList />
            <Sidebar />

            <div className="Main-app">
                <FriendsTab />
                {/* <Conversation /> */}
            </div>
        </div>
     );
}
 
export default Dashboard;