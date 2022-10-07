import styled from "styled-components";

const StyledNavbar = styled.nav`
    z-index: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 60px;
    padding: var(--base-padding);
    box-shadow: var(--box-shadow);
    background-color: var(--maastricht-blue);
    border-left: #14151e 1px solid;

    div {
        display: flex;
        align-items: center;
    }
`

const Navbar = ({ children }) => {
    return (
        <StyledNavbar>
            {children}
        </StyledNavbar>
    );
}

export default Navbar;