// * DEPENDENCIES * //
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { PulseLoader } from 'react-spinners';

// * REDUX SLICE * //
import { signup, resetAuth } from '../../features/authSlice';

// * COMPONENTS * //
import Input from '../../components/Input/Input';
import Button from '../../components/Button';

// * STYLES * //
import '../Auth.scss';
import '../../sass/index.scss'

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading, success, error } = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const spinner = <PulseLoader color="#fff" cssOverride={null} margin={2} size={5} />

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, username, password };
        dispatch(signup(userData));
    };

    useEffect(() => {
        if (user) { navigate('/channels/@me') };
        if (success) { navigate('/login') };
        if (error) { console.log(error) };
        dispatch(resetAuth());
    }, [user, success, error]);

    return (
        <motion.div className="Auth signup"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
        >
            <form className='Auth__form' onSubmit={handleSubmit}>
                <div className='Auth__form-header'>
                    <h4>Welcome aboard!</h4>
                    <h6 className='subtitle'>Sign up to chat with your friends.</h6>
                </div>
                <div className='Auth__form-inputs'>
                    <Input
                        type={'text'}
                        label={'Email'}
                        required={true}
                        onChange={e => setEmail(e.target.value)}
                        email={email}
                    >
                    </Input>
                    <Input
                        type={'text'}
                        label={'Username'}
                        required={true}
                        onChange={e => setUsername(e.target.value)}
                        username={username}
                    >
                    </Input>
                    <Input
                        type={'password'}
                        label={'password'}
                        required={true}
                        onChange={e => setPassword(e.target.value)}
                        password={password}
                    >
                    </Input>
                    <small><a>Terms of Service</a></small>
                </div>
                <div className="Auth__form-actions">
                    <Button variant={'primary'}>{loading ? spinner : 'Sign Up'}</Button>
                    <small>Already have an account? <Link to={'/login'}>Login!</Link></small>
                </div>
            </form>
        </motion.div>
    );
}

export default Signup;