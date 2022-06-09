import './Button.scss';

const Button = ( { variant, color, value, icon } ) => {
    return(
        <button variant={variant} color={color}> {value} Primary {icon} </button>
    );
}
 
export default Button;