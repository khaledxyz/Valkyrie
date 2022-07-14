import styled from 'styled-components';

export const Separator = styled.div`
    width: ${({ width }) => width || '100%'};
    height: 2px;

    border-radius: 5px;

    background-color: var(--madison);
    margin: 10px auto;

`;