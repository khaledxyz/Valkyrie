import HomeSidebar from './HomeSidebar/HomeSidebar';
import GuildSidebar from './GuildSidebar/GuildSidebar';
import UserID from '../UserID/UserID';
import { useSelector } from 'react-redux';

const Styles = {
    position: 'relative',
    minWidth: '250px',
    height: '100vh',

    backgroundColor: 'var(--maastricht-blue)'
};

const Sidebar = () => {
    const { currentTab, options } = useSelector((state) => state.currentTab);

    return (
        <div className="Sidebar" style={Styles}>
            {currentTab === 'home' ? <HomeSidebar /> : null}
            {currentTab === 'conversation' ? <HomeSidebar /> : null}
            {currentTab === 'guild' ? <GuildSidebar guildID={options} /> : null}
            <UserID />
        </div>
    );
};

export default Sidebar;
