import styled from 'styled-components';
import { DiGithubFull } from 'react-icons/di';

import Navbar from '../../components/Navbar';
import Hero from './Hero';
import Footer from './Footer';

const StyledLanding = styled.div`
    width: 100%;
    max-width: 1180px;
    margin: auto;
    height: 100vh;
`;

const Landing = () => {
    return (
        <StyledLanding>
            <Navbar />
            <Hero />
            <Footer />
        </StyledLanding >
    );
};

export default Landing;