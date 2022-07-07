import axios from "axios";

const login = async(user) => {
    const res = await axios.post("http://localhost:5000/api/users/login", user);
    if(res.data) localStorage.setItem('user', JSON.stringify(res.data));

    return res.data;
};

const signup = async(user) => {
    const res = await axios.post("http://localhost:5000/api/users", user);
    if(res.data) return res.data;
};

const authService = { login, signup };
export default authService;