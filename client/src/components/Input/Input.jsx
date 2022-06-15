import './Input.scss';

const Input = ( { type, label, placeholder, required , onChange, ref} ) => {
    return ( 
        <>
            <h6 className={`label`}>{label}</h6>
            <input onChange={onChange} className={`Input`} type={type} placeholder={placeholder} required={required} ref={ref} />
        </>
     );
}
 
export default Input;