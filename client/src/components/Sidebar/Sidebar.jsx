import HomeSidebar from './HomeSidebar/HomeSidebar';

const Styles = {
    minWidth: '250px',
    height: '100vh',

    backgroundColor: 'var(--maastricht-blue)',
}

const Sidebar = () => {
    return ( 
        <div className="Sidebar" style={Styles}>
            <HomeSidebar />
        </div>
     );
}
 
export default Sidebar;