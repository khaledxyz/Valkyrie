// * DEPENDENCIES * //
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { createFriendRequest, reset } from '../../features/friends/friendsSlice';

// * COMPONENTS * //
import Button from '../Button';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import FriendsList from './FriendsList';
import PendingList from './PendingList';
import Navbar from '../Navbar';

// * STYLES * //
import './FriendsTab.scss';

const FriendsTab = () => {
    const dispatch = useDispatch();
    const friendsState = useSelector(state => state.friends);
    const { success } = friendsState;

    const [currentTab, setCurrentTab] = useState('friends');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [friendFullUsername, setFriendFullUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const [username, tag] = friendFullUsername.split('#');
        const friendDetails = { username, tag: '#' + tag };
        dispatch(createFriendRequest(friendDetails));
    };

    useEffect(() => {
        if (success) {
            setIsModalOpen(false);
            dispatch(reset());
        };
    }, [success]);

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

            <Navbar>
                <div>
                    <p>Friends</p>
                    <Button onClick={() => setCurrentTab('friends')} variant={'transparent'} width={'80px'} height={'30px'}>Friends</Button>
                    <Button onClick={() => setCurrentTab('pending')} variant={'transparent'} width={'80px'} height={'30px'}>Pending</Button>
                </div>
                <Button onClick={() => setIsModalOpen(true)} variant={'transparent'} width={'80px'} height={'30px'}>Add Friend</Button>
            </Navbar>

            <div className="Friends-container">
                {currentTab === 'friends' && <FriendsList />}
                {currentTab === 'pending' && <PendingList />}
            </div>
        </div>
    );
}

export default FriendsTab;