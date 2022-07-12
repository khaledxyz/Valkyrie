import './Dashboard.scss';

import ServerList from "../../components/ServerList/ServerList";
const Dashboard = () => {
    return ( 
        <div className='Dashboard'>
            <ServerList />
        </div>
     );
}
 
export default Dashboard;