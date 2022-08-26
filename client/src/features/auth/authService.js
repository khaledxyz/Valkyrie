import { axiosInstance } from '../../app/axios';

const login = async (user) => {
    const res = await axiosInstance.post('/api/auth', user);
    if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

    return res.data;
};

const signup = async (user) => {
    const res = await axiosInstance.post('/api/users', user);
    if (res.data) return res.data;
};

const logout = async (user) => {
    const res = await axiosInstance.delete('/api/auth', user);
    if (res.data) return res.data;
};

const authService = { login, signup, logout };
export default authService;
