import styled from "styled-components";
import Button from "../../components/Button";
import { Link, useNavigate } from 'react-router-dom';

const StyledHero = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 80%;
    padding: 20px;

    @keyframes floating {
        0% { transform: translate(0,  0px); }
        50%  { transform: translate(0, 15px); }
        100%   { transform: translate(0, -0px); }   
    }

    img{
        animation-name: floating;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        margin-left: 30px;
        margin-top: 5px;

        width: 50%;
        margin: auto;

        box-shadow: var(--box-shadow);
    }

    div{
        padding-right: 50px;
        p{margin-bottom: 20px;}
    }


    @media only screen and (max-width: 820px) {
        flex-direction: column-reverse;
        width: 80%;
        margin: auto;

        img{
            width: 100%;
            z-index: -1;
            opacity: 0.5;
        }

        div{
            display: flex;
            flex-direction: column;
            align-items: center;

            text-align: center;
            font-size: 0.9rem;

            margin: auto;
            padding: 0;
        }
    }
`

const Hero = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <StyledHero>
            <div>
                <p>
                    Whether you're part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Valkyrie makes it easy to talk every day and hang out more often.
                </p>

                {!user ?
                    <>
                        <Button variant={'primary'} height={'35px'} width={'100px'} onClick={() => navigate('/signup')}>Sign Up</Button>
                        <small>Already have an account? <Link to={'/login'}>Login!</Link></small>
                    </>
                    :
                    <Button variant={'primary'} height={'35px'} width={'120px'} onClick={() => navigate('/channels/@me')}>Open Valkyrie</Button>
                }

            </div>
            <img src='ui.svg' />
        </StyledHero>
    );
}

export default Hero;