// * DEPENDENCIES * //
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { deleteFriend } from '../../features/friends/friendsSlice';

// * COMPONENTS * //
import Button from '../Button';
import Loading from './Loading';
import { ProfileIcon } from '../ProfileIcon';
import { Friend } from './Friend';

const FriendsList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { friends, isLoading } = useSelector((state) => state.friends);

    const removeFriend = (e, friend) => {
        e.stopPropagation();
        dispatch(deleteFriend(friend._id));
    };

    if (isLoading) return (
        <>
            <Loading />
            <Loading />
            <Loading />
        </>
    );

    return (
        friends?.map((friend) => (
            <Friend
                key={friend._id}
                onClick={() => navigate(`/channels/@me/${friend._id}`)}
            >
                <ProfileIcon avatar={friend.avatar} />
                <p>{friend.username}</p>
                <Button
                    onClick={(e) => removeFriend(e, friend)}
                    variant={'danger'}
                    width={'80px'}
                    height={'30px'}>
                    Remove
                </Button>
            </Friend>
        ))
    );
};

export default FriendsList;
