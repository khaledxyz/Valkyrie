// * DEPENDENCIES * //
import { Navigate, Route, Routes } from 'react-router-dom'

// * PAGES * //
import Dashboard from '../pages/Dashboard/Dashboard'
import Landing from '../pages/Landing/Landing'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'

const AppRoutes = () => {
    const user = localStorage.getItem("user");

    const isUserLogged = !user ? <Login /> : <Navigate to="/channels" />;
    const isUserSigned = !user ? <Signup /> : <Navigate to="/channels" />;

    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path="/channels/*" element={<Dashboard />} />
            <Route path="/login" element={isUserLogged} />
            <Route path="/signup" element={isUserSigned} />
        </Routes>
    )
}

export default AppRoutes;
