import HomeSidebar from './HomeSidebar/HomeSidebar';

const Styles = {
    width: '250px',
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