import styled from 'styled-components';
import { cssVar, lighten } from 'polished';

const StyledContextMenu = styled.div`
    z-index: 10;
    position: absolute;
    top: ${({ position }) => position.y + 'px'};
    left: ${({ position }) => position.x + 'px'};
    translate: 0, -50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 190px;
    height: fit-content;
    padding: 7px;

    border-radius: 3px;
    background-color: ${lighten(0.05, cssVar('--down-river'))};
    box-shadow: var(--box-shadow);
`;

export const ContextItem = styled.div`
    cursor: pointer;
    width: 100%;
    height: 35px;

    display: flex;
    align-items: center;

    padding-left: 7px;
    border-radius: 3px;

    font-size: 0.9rem;
    color: var(--lavender-blush);

    &:hover{background-color: var(--azure-radiance);}
`

const ContextMenu = ({ children, contextMenu, position }) => {
    if (!contextMenu) return;

    return (
        <StyledContextMenu position={position}>
            {children}
        </StyledContextMenu>
    );
};


export default ContextMenu;