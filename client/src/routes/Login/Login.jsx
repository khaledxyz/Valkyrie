import { useState } from 'react';
import { Link } from "react-router-dom";

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import '../Auth.scss';
import '../../sass/index.scss'

import axios from 'axios';
import toastr from 'toastr';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post('http://localhost:8080/login', {
                email,
                password
            });

            if(res.status === 200) console.log('Logged In Successfully');
        }
        catch(err) {
            console.log(err);
            toastr.error('Please try again.', err.response.data.msg , options)
        };
    };


    return ( 
        <motion.div className="Auth login" 
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
        >
            <form className='Auth__form' onSubmit={handleSubmit}>
                <div className='Auth__form-header'>
                    <h4>Well, ahoy there!</h4>
                    <h6 className='subtitle'>Login to chat with your friends.</h6>
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
                        type={'password'} 
                        label={'password'} 
                        required={true} 
                        onChange={e => setPassword(e.target.value)} 
                        password={password}
                        >
                    </Input>
                    <small><a>Forgot your password?</a></small>
                </div>
                <div className="Auth__form-actions">
                    <Button></Button>
                    <small>Don't have an account? <Link to={'/signup'}>Sign Up!</Link></small>
                </div>
            </form>
        </motion.div>
     );
}
 
export default Login;