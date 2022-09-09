import styled from 'styled-components';

export const ServerIcon = styled.div`
    position: relative;
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;

    background-color: var(--madison);
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: cover;
    background-position: center;

    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
        content: ${({ initials }) => `'${initials}'`};
    }

    transition: all 0.2s ease;

    // Hover
    &:hover {
        cursor: pointer;
        border-radius: 30%;
        background-color: var(--azure-radiance);

        &::before {
            content: '';

            position: absolute;
            left: -20px;

            width: 13px;
            height: 40%;
            border-radius: 5px;

            background-color: var(--lavender-blush);
        }
    }

    &.active{
        border-radius: 30%;
        background-color: var(--azure-radiance);
    }
    &.active::before {
        content: '';

        position: absolute;
        left: -20px;

        width: 13px;
        height: 70%;
        border-radius: 5px;

        background-color: var(--lavender-blush);
    }
`;

export const HomeIcon = styled(ServerIcon)`
    background: var(--madison);
    font-size: 1.5rem;
    &:after {
        content: '';
    }
    &:hover {
        background: var(--azure-radiance);
    }
`;
export const CreateServerIcon = styled(ServerIcon)`
    background: var(--madison);
    &:after {
        content: '';
    }
    &:hover {
        background: #44af69;
    }
`;
