const Dashboard = () => {
    const userID = localStorage.getItem("user");

    return ( 
        <p>{userID}</p>
     );
}
 
export default Dashboard;