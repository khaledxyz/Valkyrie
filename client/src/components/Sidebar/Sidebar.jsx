import HomeSidebar from './HomeSidebar/HomeSidebar';
import UserID from '../UserID/UserID';

const Styles = {
    position: 'relative',
    minWidth: '250px',
    height: '100vh',

    backgroundColor: 'var(--maastricht-blue)'
};

const Sidebar = () => {
    return (
        <div className="Sidebar" style={Styles}>
            <HomeSidebar />
            <UserID />
        </div>
    );
};

export default Sidebar;
