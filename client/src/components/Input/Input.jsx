import './Input.scss';

const Input = ({ type, label, placeholder, required, onChange, value, inputRef }) => {

    return (
        <>
            <h6 className={`label`}>{label}</h6>
            <input
                className={`Input`}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                value={value}
                ref={inputRef}
            />
        </>
    );
}

export default Input;