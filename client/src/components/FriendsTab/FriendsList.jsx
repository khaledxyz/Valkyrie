// * DEPENDENCIES * //
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// * COMPONENTS * //
import Button from '../Button';
import Loading from './Loading';
import { ProfileIcon } from '../ProfileIcon';
import { Friend } from './Friend';

const FriendsList = () => {
    const navigate = useNavigate();
    const { userFriends, isLoading } = useSelector((state) => state.friends);

    if (isLoading) return (
        <>
            <Loading />
            <Loading />
            <Loading />
        </>
    );

    return (
        userFriends?.map((friend) => (
            <Friend
                key={friend._id}
                onClick={() => navigate(`/channels/@me/${friend._id}`)}
            >
                <ProfileIcon avatar={friend.avatar} />
                <p>{friend.username}</p>
                <Button
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
