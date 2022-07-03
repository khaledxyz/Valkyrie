import { useRef } from 'react';

import './Input.scss';

const Input = ( { type, label, placeholder, required , onChange, error } ) => {
    const inputRef = useRef();
    let err = null
    if(error) {
        inputRef.current.classList.add('error');
        err = error.response.data.msg
    }

    return ( 
        <>
            <h6 className={`label`}>{`${label} ${err ? ' - ' + err : ''}`}</h6>
            <input 
            onChange={onChange} 
            className={`Input`} 
            type={type} placeholder={placeholder} 
            required={required}
            ref={inputRef}
            />
        </>
     );
}
 
export default Input;