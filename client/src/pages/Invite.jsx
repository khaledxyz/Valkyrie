import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { acceptInvite, resetInvites } from '../features/invites/invitesSlice';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

const StyledInvite = styled.div``

const Invite = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { invite } = useParams();

    const user = JSON.parse(localStorage.getItem('user'));
    const { loading, success, Error } = useSelector(state => state.invites);

    useEffect(() => {
        if (!user && !invite) {
            navigate('/login');
            return;
        };

        dispatch(acceptInvite(invite));

        if (success) {
            navigate('/channels/@me');
            return;
        };

        if (Error) {
            setTimeout(() => {
                dispatch(resetInvites());
                navigate('/channels/@me');
            }, 2000);
        };

    }, [invite, success, Error]);

    return (
        <StyledInvite>
            {loading && <h2>Looking for server...</h2>}
            {Error && <h2>{Error} Redirecting...</h2>}
        </StyledInvite>
    );
};

export default Invite;