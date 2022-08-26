// * DEPENDENCIES * //
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// * REDUX SLICE * //
import { setCurrentTab } from '../../features/currentTab/currentTabSlice';

// * COMPONENTS * //
import Button from '../Button';
import { Friend } from './Friend';
import { ProfileIcon } from '../ProfileIcon';

const FriendsList = () => {
    const dispatch = useDispatch();
    const { userFriends, isLoading } = useSelector((state) => state.friends);

    const handleShowConversation = (friendID) => {
        dispatch(
            setCurrentTab({ currentTab: 'conversation', options: friendID })
        );
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
