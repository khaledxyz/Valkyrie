// * DEPENDENCIES * //
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

// * ROUTES * //
import Landing from "./routes/Landing/Landing";
import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";

// * STYLES * //
import './sass/index.scss';

const App = () => {
  return (
    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  )
}

export default App;