// * DEPENDENCIES * //
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { reset, sendFriendRequest } from '../../features/friends/friendsSlice';

// * COMPONENTS * //
import Button from '../Button';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';

// * STYLES * //
import './FriendsTab.scss';
import FriendsList from './FriendsList';


const FriendsTab = () => {
    const dispatch = useDispatch();
    const friendsState = useSelector(state => state.friends);
    const { isSuccess } = friendsState;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('friends');
    const [friendFullUsername, setFriendFullUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const [username, tag] = friendFullUsername.split('#');
        const friendDetails = {username, tag: '#' + tag};
        dispatch(sendFriendRequest(friendDetails));
    };

    useEffect(() => {
        if(isSuccess) {
            setIsModalOpen(false);
            dispatch(reset);
        };
    }, [isSuccess]);

    return (
        <div className="FriendsTab">
            <Modal 
                isModalOpen={isModalOpen} 
                close={() => setIsModalOpen(false)}
                title={'Add a friend'}
                action={'Add'}
                handleSubmit={handleSubmit}
                >
                <Input
                    type={'text'}
                    label={'Username'}
                    required={true}
                    placeholder={'Valkyrie#0001'}
                    onChange={e => setFriendFullUsername(e.target.value)} 
                    friendFullUsername={friendFullUsername}
                >
                </Input>
            </Modal>

            <nav className="Navbar">
                <div>
                    <p>Friends</p>
                    <Button onClick={() => setCurrentTab('friends')} variant={'transparent'} width={'80px'} height={'30px'}>Friends</Button>
                    <Button onClick={() => setCurrentTab('pending')} variant={'transparent'} width={'80px'} height={'30px'}>Pending</Button>
                </div>
                <Button onClick={() => setIsModalOpen(true)} variant={'transparent'} width={'80px'} height={'30px'}>Add Friend</Button>
            </nav>

            <div className="Friends-container">
                {
                    currentTab == 'friends' ?
                        <FriendsList /> :
                        <p>Pending</p>
                }
            </div>
        </div>
    );
}

export default FriendsTab;