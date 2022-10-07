import { lighten, cssVar } from 'polished';
import styled from 'styled-components';

export const Friend = styled.div`
    position: relative;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: start;

    width: 100%;
    height: 60px;
    padding: 10px;
    border-radius: var(--border-radius);
    background-color: var(--maastricht-blue);

    button, .actions{
        position: absolute;
        right: 10px;
        top: 50%;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        
        transform: translateY(-50%);
    }

    transition: 0.2s ease;
    p{margin-left: calc(var(--base-margin) / 2);}
    &:hover {background-color: ${lighten(0.05, cssVar('--maastricht-blue'))};}
`