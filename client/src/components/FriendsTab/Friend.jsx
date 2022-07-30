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
    background-color: var(--down-river);

    border-bottom: 1px solid ${lighten(0.05, '#0c2c4e')};
    border-top: 1px solid ${lighten(0.05, '#0c2c4e')};

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

    p{
        margin-left: calc(var(--base-margin) / 2);
    }

    &:hover {
        background-color: ${lighten(0.05, '#0c2c4e')};
    }
`;
