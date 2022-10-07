import styled from 'styled-components';

const Separator = styled.div`
    width: ${({ width }) => width || '100%'};
    height: 1px;

    border-radius: 5px;

    background-color: #2e2f35;
    margin: 10px auto;
`;

export default Separator;