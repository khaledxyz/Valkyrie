import './Button.scss';

const SIZES = ['btn-md', 'btn-lg', 'btn-sm',];

const Button = ( { type, onClick, variant, color, icon, children } ) => {
    if(!type) type = 'button';
    if(!onClick) onClick = () => {};

    let STYLE = `btn-${variant}-${color}`;
    if(STYLE.includes('undefined')) STYLE = "btn-normal-primary"

    return(
        <button 
        type={type} 
        onClick={(onClick)} 
        className={`btn ${STYLE}`} >{children}{icon}</button>

        // <button
        // type={type}
        // onClick={onClick}
        // variant={variant} 
        // icon={icon}
        // color={color}>
        // {children}
        // </button>
    );
}
 
export default Button;