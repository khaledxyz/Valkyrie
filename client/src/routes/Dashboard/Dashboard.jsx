import './Dashboard.scss';

import ServerList from "../../components/ServerList/ServerList";
import Sidebar from '../../components/Sidebar/Sidebar';
const Dashboard = () => {
    return ( 
        <div className='Dashboard'>
            <ServerList />
            <Sidebar />
        </div>
     );
}
 
export default Dashboard;