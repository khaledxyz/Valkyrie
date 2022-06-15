import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import './Login.scss';
import '../../sass/index.scss'
import { useState, useRef } from 'react';

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email, password);
    };

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    return ( 
        <div className="Login">
            <form className='Login__form' onSubmit={handleSubmit}>
                <div className='Login__form-header'>
                    <h4>Well, ahoy there!</h4>
                    <h6 className='subtitle'>Login to chat with your friends.</h6>
                </div>
                <div className='Login__form-inputs'>
                    <Input ref={emailRef} type={'text'} label={'Email'} placeholder={'Email'} required={true} />
                    <Input ref={passwordRef} type={'password'} label={'password'} placeholder={'Password'} required={true} />
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