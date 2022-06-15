import { useState } from 'react';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import './Login.scss';
import '../../sass/index.scss'

import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const res = await axios.post('http://localhost:8080/login', {
                email: email,
                password: password
            });

            if(res.status === 200) console.log('Login success');
        }
        catch(err) {console.log(err)};
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
                        onChange={e => setEmail(e.target.value)} 
                        email={email}>
                    </Input>
                    <Input 
                        type={'password'} 
                        label={'password'} 
                        placeholder={'Password'} 
                        required={true} 
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