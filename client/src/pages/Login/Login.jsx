import { useState } from 'react';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import './Login.scss';
import '../../sass/index.scss'

import axios from 'axios';
import toastr from 'toastr';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
        }
        catch(err) {
            setError('error')
            toastr.error('Please try again.', err.response.data.msg , options)
        };
    };


    return ( 
        <div className="Login">
            <form className='Login__form' onSubmit={handleSubmit}>
                <div className='Login__form-header'>
                    <h4>Well, ahoy there!</h4>
                    <h6 className='subtitle'>Login to chat with your friends.</h6>
                </div>
                <div className='Login__form-inputs'>
                    <Input 
                        type={'text'} 
                        label={'Email'} 
                        placeholder={'Email'} 
                        required={true} 
                        error={error}
                        onChange={e => setEmail(e.target.value)} 
                        email={email}>
                    </Input>
                    <Input 
                        type={'password'} 
                        label={'password'} 
                        placeholder={'Password'} 
                        required={true} 
                        error={error}
                        onChange={e => setPassword(e.target.value)} 
                        password={password}>
                    </Input>
                    <small><a>Forgot your password?</a></small>
                </div>
                <div className="Login__form-actions">
                    <Button></Button>
                    <small>Don't have an account? <a>Sign Up!</a></small>
                </div>
            </form>
        </div>
     );
}
 
export default Login;