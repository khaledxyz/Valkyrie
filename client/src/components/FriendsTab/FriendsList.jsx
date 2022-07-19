import { useSelector } from 'react-redux';
import { Friend } from "./Friend"
import { ProfileIcon } from '../ProfileIcon';
import Button from '../Button';

const FriendsList = () => {
    const { friends, isLoading } = useSelector((state) => state.friends);
    return (
        isLoading ? <p>Loading</p> :
        friends.map((friend) => {
            const template = (
                <Friend key={friend._id}>
                    <ProfileIcon />
                    <p>{friend.username}</p>
                    <Button variant={'danger'} width={'80px'} height={'30px'}>Remove</Button>
                </Friend>
            );

            return template;
        })
    );
}
 
export default FriendsList;