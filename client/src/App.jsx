// * DEPENDENCIES * //
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

// * ROUTES * //
import Landing from "./routes/Landing/Landing";
import Dashboard from "./routes/Dashboard/Dashboard";
import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";

// * STYLES * //
import './sass/index.scss';

const App = () => {
  const user = localStorage.getItem("user");

  return (
    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/channels" element={user ? <Dashboard /> : <Navigate to="/login"/>}/>
          <Route exact path="/login" element={!user ? <Login /> : <Navigate to="/channels"/>} />
          <Route exact path="/signup" element={!user ? <Signup /> : <Navigate to="/channels"/>} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  )
}

export default App;