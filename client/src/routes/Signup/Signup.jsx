// * DEPENDENCIES * //
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// * REDUX SLICE * //
import { signup, reset } from '../../features/auth/authSlice';

// * COMPONENTS * //
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

// * STYLES * //
import '../Auth.scss';
import '../../sass/index.scss'

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { user, isLoading, isSuccess, Error } = authState;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, username, password};
        dispatch(signup(userData));
    };

    useEffect(() => {
        if (Error) console.log(Error);
    
        if (isSuccess) {
            navigate('/login')
            return;
        }
    
        dispatch(reset())
      }, [user, Error, isSuccess, navigate, dispatch])

    return ( 
        <motion.div className="Auth signup"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
        >
            {isLoading ? <h1>Loading...</h1> : null}
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
                    <Button></Button>
                    <small>Already have an accout? <Link to={'/login'}>Login!</Link></small>
                </div>
            </form>
        </motion.div>
     );
}
 
export default Signup;