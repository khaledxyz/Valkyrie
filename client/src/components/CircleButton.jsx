import styled from 'styled-components';
import { lighten } from 'polished'

const CircleButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 35px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: var(--maastricht-blue);
`;

export default CircleButton;
