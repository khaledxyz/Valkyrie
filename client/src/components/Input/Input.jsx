import './Input.scss';

const Input = ( { type, label, placeholder, required , onChange, error } ) => {
    return ( 
        <>
            <h6 className={`label`}>{label}</h6>
            <input onChange={onChange} className={`Input ${error}`} type={type} placeholder={placeholder} required={required}/>
        </>
     );
}
 
export default Input;