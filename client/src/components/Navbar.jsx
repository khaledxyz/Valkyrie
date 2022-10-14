import styled from "styled-components";
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';

const StyledNavbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 20px;

    .logo{
        cursor: pointer;
        user-select: none;
        position: relative;
        width: fit-content;
        color: #fff;
        text-decoration: none;

        h3{
            font-size: 2rem;
        }
        
        img{
            z-index: -1;
            position: absolute;
            top: 50%;
            left: 45%;
            translate: -50% -50%;

            height: 100%;
        }
    }

    .ctas{
        display: flex;
        align-items: center;
    }
`
const user = JSON.parse(localStorage.getItem('user'));

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <StyledNavbar>
            <Link to={'/'} className='logo'>
                <h3>Valkyrie</h3>
                <img src='/logo.png' />
            </Link>

            <div className='ctas'>{!user ?
                <><Button variant={'transparent'} height={'35px'} width={'100px'} onClick={() => navigate('/login')}>Login</Button>
                    <Button variant={'primary'} height={'35px'} width={'100px'} onClick={() => navigate('/signup')}>Sign Up</Button></>
                : <Button variant={'primary'} height={'35px'} width={'100px'} onClick={() => navigate('/channels/@me')}>Open</Button>
            }</div>
        </StyledNavbar>
    );
}

export default Navbar;