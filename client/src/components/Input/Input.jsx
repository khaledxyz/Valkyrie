import './Input.scss';

const Input = ( { type, label, placeholder, required } ) => {
    return ( 
        <>
            <h6 className={`label`}>{label}</h6>
            <input className={`Input`} type={type} placeholder={placeholder} required={required} />
        </>
     );
}
 
export default Input;