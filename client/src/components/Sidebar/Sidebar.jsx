import HomeSidebar from './HomeSidebar/HomeSidebar';
import GuildSidebar from './GuildSidebar/GuildSidebar';
import UserID from '../UserID/UserID';
import { Routes, Route } from 'react-router-dom';

const Styles = {
    position: 'relative',
    minWidth: '250px',
    height: '100vh',

    backgroundColor: 'var(--maastricht-blue)'
};

const Sidebar = () => {

    return (
        <div className="Sidebar" style={Styles}>
            <Routes>
                <Route path={'@me/*'} element={<HomeSidebar />} />
                <Route path={':guildID/*'} element={<GuildSidebar />} />
            </Routes>
            <UserID />
        </div>
    );
};

export default Sidebar;
