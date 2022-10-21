import styled from 'styled-components';

const StyledDashboard = styled.div`
    display: flex;

    width: 100vw;
    height: 100vh;
`

export const App = styled.div`
    width: 100%;
    height: 100VH;
    background-color: var(--down-river);
`
export const Notification = styled.div`
        z-index: 1;
        position: absolute;

        font-size: 0.7rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;

        top: 55px;
        left: 45px;

        width: 15px;
        height: 15px;

        border-radius: 50%;
        background-color: var(--error-danger);
        outline: 5px solid var(--ebony);
`;

export default StyledDashboard;