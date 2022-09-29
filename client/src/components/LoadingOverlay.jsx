import styled from 'styled-components';
import { HashLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';

const StyledLoadingOverlay = styled.div`

    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

`
const MotionLoadingOverlay = motion(StyledLoadingOverlay)

const LoadingOverlay = ({ isReady }) => {
    return (
        <AnimatePresence>{!isReady &&
            <MotionLoadingOverlay exit={{ opacity: 0 }}>
                <HashLoader color="#fff" size={70} />
            </MotionLoadingOverlay>
        }</AnimatePresence>
    );
}

export default LoadingOverlay;