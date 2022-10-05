import styled from 'styled-components';

const CircleButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 35px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: var(--maastricht-blue);
    
    transition: filter 0.3s ease;
    &:hover{filter: brightness(1.2);}
`;

export default CircleButton;
