// * DEPENDENCIES * //
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// * REDUX SLICE * //
import {
    fetchFriendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    reset
} from '../../features/friends/friendsSlice';

// * COMPONENTS * //
import { Friend } from './Friend';
import { ProfileIcon } from '../ProfileIcon';
import CircleButton from '../CircleButton';
import Loading from './Loading';

// * ICONS * //
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

const FriendsList = () => {
    const dispatch = useDispatch();
    const { loading, success } = useSelector((state) => state.friends);
    const { comingFriendRequests, outgoingFriendRequests } = useSelector((state) => state.friends.requests);

    useEffect(() => {
        dispatch(fetchFriendRequests());
        if (success) dispatch(reset());
    }, []);

    const handleReject = (id) => { dispatch(rejectFriendRequest(id)); };
    const handleAccept = (id) => { dispatch(acceptFriendRequest(id)); };

    if (loading) return (
        <>
            <Loading />
            <Loading />
            <Loading />
        </>
    );

    return (
        <>
            {comingFriendRequests?.map((friend) => (
                <Friend key={friend._id}>
                    <ProfileIcon avatar={friend.avatar} />
                    <p>{friend.username}</p>
                    <div className="actions">
                        <CircleButton onClick={() => handleAccept(friend._id)}>
                            <AiOutlineCheck />
                        </CircleButton>
                        <CircleButton onClick={() => handleReject(friend._id)}>
                            <AiOutlineClose />
                        </CircleButton>
                    </div>
                </Friend>
            ))}

            {outgoingFriendRequests?.map((friend) => (
                <Friend key={friend._id}>
                    <ProfileIcon avatar={friend.avatar} />
                    <p>{friend.username}</p>
                    <div className="actions">
                        <CircleButton>
                            <AiOutlineClose />
                        </CircleButton>
                    </div>
                </Friend>
            ))}
        </>
    )
};

export default FriendsList;
