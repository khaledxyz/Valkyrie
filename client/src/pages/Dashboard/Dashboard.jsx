// * DEPENDENCIES * //
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

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

    useEffect(() => {
        // dispatch(getAllGuilds());
        dispatch(getAllFriends());
    }, []);

    return ( 
        <div className='Dashboard'>
            <ServerList />
            <Sidebar />

            <div className="Main-app">
                {/* <FriendsTab /> */}
                <Conversation />
            </div>
        </div>
     );
}
 
export default Dashboard;