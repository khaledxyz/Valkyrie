import styled from 'styled-components';

export const ProfileIcon = styled.div`
    cursor: pointer;

    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;

    background-image: ${({ avatar }) => `url(${avatar})`};
    background-size: cover;
    background-position: center;
`;
