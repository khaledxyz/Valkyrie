// * DEPENDENCIES * //
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// * COMPONENTS * //
import Button from '../Button';
import { Friend } from './Friend';
import { ProfileIcon } from '../ProfileIcon';

const FriendsList = () => {
    const navigate = useNavigate();
    const { userFriends, isLoading } = useSelector((state) => state.friends);

    const handleShowConversation = (friendID) => {
        navigate(`/channels/@me/${friendID}`);
    };

    return isLoading ? (
        <p>Loading</p>
    ) : (
        userFriends?.map((friend) => {
            const template = (
                <Friend
                    key={friend._id}
                    onClick={() => handleShowConversation(friend._id)}
                >
                    <ProfileIcon avatar={friend.avatar} />
                    <p>{friend.username}</p>
                    <Button variant={'danger'} width={'80px'} height={'30px'}>
                        Remove
                    </Button>
                </Friend>
            );

            return template;
        })
    );
};

export default FriendsList;
