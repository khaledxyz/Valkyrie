import styled from "styled-components"

export const ProfileIcon = styled.div`
    cursor: pointer;

    height: 100%;
    aspect-ratio: 1;
    border-radius: 50%;

    background-image: url(https://cdn.discordapp.com/avatars/373146874523287552/c1a6fc5480aca20b09ea2428accd3bc7.webp);
    background-size: cover;
    background-position: center;

    // if the user is online, show a green dot
    &.online{
        background-color: green;
    }
`