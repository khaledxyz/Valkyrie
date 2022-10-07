// * DEPENDENCIES * //
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

// * COMPONENTS * //
import HomeSidebar from './HomeSidebar';
import GuildSidebar from './GuildSidebar';
import UserID from '../UserID/UserID';

const StyledNavbar = styled.aside`
    position: relative;
    min-width: 250px;
    height: 100vh;
    background-color: var(--maastricht-blue);
    z-index: 0;
    padding: calc(var(--base-padding) + 3px) 15px;
`;

const Sidebar = () => {
    return (
        <StyledNavbar>
            <Routes>
                <Route path={'@me/*'} element={<HomeSidebar />} />
                <Route path={':guildID/*'} element={<GuildSidebar />} />
            </Routes>
            <UserID />
        </StyledNavbar>
    );
};

export default Sidebar;
