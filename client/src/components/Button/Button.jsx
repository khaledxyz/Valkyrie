import './Button.scss';

const SIZES = ['btn-md', 'btn-lg', 'btn-sm', 'btn-flexible'];

const Button = ( { type, onClick, variant, color, size, icon, children } ) => {
    if(!type) type = 'button';
    if(!onClick) onClick = () => {};

    let STYLE = `btn-${variant}-${color}`;
    let SIZE = `btn-${size}`;
    if(STYLE.includes('undefined')) STYLE = "btn-normal-primary"
    if(SIZE.includes('undefined')) SIZE = "btn-md"

    return(
        <button 
        type={type} 
        onClick={(onClick)} 
        className={`btn ${STYLE} ${SIZE}`} >{children}{icon}</button>
    );
}
 
export default Button;