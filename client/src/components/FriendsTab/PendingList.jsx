// * DEPENDENCIES * //
import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// * REDUX SLICE * //
import { fetchFriendRequests, acceptFriendRequest, deleteFriendRequest, reset } from '../../features/friends/friendsSlice';
import { SocketContext } from '../../context/SocketContext';

// * COMPONENTS * //
import { Friend } from './Friend';
import { ProfileIcon } from '../ProfileIcon';
import CircleButton from '../CircleButton';
import Loading from './Loading';

// * ICONS * //
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

const FriendsList = () => {
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    const { user } = useSelector(state => state.auth);
    const { loading, success } = useSelector((state) => state.friends);
    const { comingFriendRequests, outgoingFriendRequests } = useSelector(state => state.friends.requests);

    useEffect(() => {
        dispatch(fetchFriendRequests());
        if (success) dispatch(reset());
    }, []);

    const handleReject = (id) => { dispatch(deleteFriendRequest(id)); };
    const handleAccept = (id) => {
        dispatch(acceptFriendRequest(id));
        socket.emit('accept_friend_request_notification', user.details.username, id);
    };

    if (loading) return (
        <>
            <Loading />
            <Loading />
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
                        <CircleButton onClick={() => handleAccept(friend._id)}><AiOutlineCheck /></CircleButton>
                        <CircleButton onClick={() => handleReject(friend._id)}><AiOutlineClose /></CircleButton>
                    </div>
                </Friend>
            ))}

            {outgoingFriendRequests?.map((friend) => (
                <Friend key={friend._id}>
                    <ProfileIcon avatar={friend.avatar} />
                    <p>{friend.username}</p>
                    <div className="actions">
                        <CircleButton onClick={() => handleReject(friend._id)}><AiOutlineClose /></CircleButton>
                    </div>
                </Friend>
            ))}
        </>
    )
};

export default FriendsList;
