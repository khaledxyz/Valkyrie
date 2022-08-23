// * DEPENDENCIES * //
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// * REDUX SLICE * //
import {
    getAllfriendRequests,
    acceptFriendRequest,
    rejectFriendRequest
} from '../../features/friends/friendsSlice';

// * COMPONENTS * //
import { Friend } from './Friend';
import { ProfileIcon } from '../ProfileIcon';
import CircleButton from '../CircleButton';

// * ICONS * //
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

const FriendsList = () => {
    const dispatch = useDispatch();
    const { comingFriendRequests, outgoingFriendRequests } =
        JSON.parse(localStorage.getItem('friendRequests')) || [];

    useEffect(() => {
        dispatch(getAllfriendRequests());
    }, []);

    const handleReject = (id) => {
        dispatch(rejectFriendRequest(id));
    };

    const handleAccept = (id) => {
        dispatch(acceptFriendRequest(id));
    };

    return (
        <>
            <div>
                {comingFriendRequests?.map((friend) => {
                    const template = (
                        <Friend key={friend._id}>
                            <ProfileIcon />
                            <p>{friend.username}</p>
                            <div className="actions">
                                <CircleButton
                                    onClick={() => handleAccept(friend._id)}
                                >
                                    <AiOutlineCheck />
                                </CircleButton>
                                <CircleButton
                                    onClick={() => handleReject(friend._id)}
                                >
                                    <AiOutlineClose />
                                </CircleButton>
                            </div>
                        </Friend>
                    );
                    return template;
                })}
            </div>
            <div>
                {outgoingFriendRequests?.map((friend) => {
                    const template = (
                        <Friend key={friend._id}>
                            <ProfileIcon />
                            <p>{friend.username}</p>
                            <div className="actions">
                                <CircleButton>
                                    <AiOutlineClose />
                                </CircleButton>
                            </div>
                        </Friend>
                    );
                    return template;
                })}
            </div>
        </>
    );
};

export default FriendsList;
