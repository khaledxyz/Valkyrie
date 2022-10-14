import styled from 'styled-components';

const StyledFooter = styled.div`
    position: absolute;
    width: 100%;
    max-width: 1180px;
    bottom: 1%;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    svg{font-size: 1.5rem;}
`;

const Footer = () => {
    return (
        <StyledFooter>
            <h6>
                Developed by <a href='https://github.com/khaledxyz/' target='_blank' >khaled.xyz </a>
                See on <a href='https://github.com/khaledxyz/valkyrie' target='_blank'>GitHub</a>
                <br />
                &#9888; Data gets wiped every 24 hours
            </h6>
        </StyledFooter >
    );
};

export default Footer;