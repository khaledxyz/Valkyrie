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
            <Route exact path='/' element={<Landing />} />
            <Route exact path="/channels" element={<Dashboard />} />
            <Route exact path="/login" element={isUserLogged} />
            <Route exact path="/signup" element={isUserSigned} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    )
}

export default AppRoutes;
