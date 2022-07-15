// * DEPENDENCIES * //
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// * REDUX SLICE * //
import { getAllGuilds } from '../../features/guilds/guildsSlice';

// * COMPONENTS * //
import ServerList from "../../components/ServerList/ServerList";
import Sidebar from '../../components/Sidebar/Sidebar';
import FriendsList from '../../components/FriendsList/FriendsList';

// * STYLES * //
import './Dashboard.scss';

const Dashboard = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const guildsState = useSelector((state) => state.guilds);

    useEffect(() => {
        dispatch(getAllGuilds());
    }, []);

    return ( 
        <div className='Dashboard'>
            <ServerList />
            <Sidebar />

            <div className="Main-app">
                <FriendsList />
            </div>
        </div>
     );
}
 
export default Dashboard;