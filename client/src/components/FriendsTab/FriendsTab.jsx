// * DEPENDENCIES * //
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { updateOnline, createFriendRequest } from '../../features/friends/friendsSlice';
import { SocketContext, socket } from '../../context/SocketContext';

// * COMPONENTS * //
import Button from '../Button';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import FriendsList from './FriendsList';
import PendingList from './PendingList';
import ConversationNavbar from '../ConversationNavbar';

// * STYLES * //
import './FriendsTab.scss';
import OnlineList from '../OnlineList';

const FriendsTab = () => {
    const dispatch = useDispatch();

    const { online, success } = useSelector(state => state.friends);
    const { user } = useSelector(state => state.auth);
    const socket = useContext(SocketContext);
    const [currentTab, setCurrentTab] = useState('friends');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [friendFullUsername, setFriendFullUsername] = useState('');

    useEffect(() => {
        socket.emit('get_online_friends', user.details._id);

        setInterval(() => {
            socket.emit('get_online_friends', user.details._id);
        }, 10000);

        socket.on('receive_online_friends', onlineFriends => dispatch(updateOnline(onlineFriends)));

        return () => { socket.off('receive_online_friends') };
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const [username, tag] = friendFullUsername.split('#');
        const friendDetails = { username, tag: '#' + tag };
        dispatch(createFriendRequest(friendDetails));
    };

    useEffect(() => { if (success) { setIsModalOpen(false) } }, [success]);

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

            <ConversationNavbar>
                <div>
                    <p>Friends</p>
                    <Button onClick={() => setCurrentTab('friends')} variant={'transparent'} width={'80px'} height={'30px'}>Friends</Button>
                    <Button onClick={() => setCurrentTab('pending')} variant={'transparent'} width={'80px'} height={'30px'}>Pending</Button>
                </div>
                <Button onClick={() => setIsModalOpen(true)} variant={'transparent'} width={'80px'} height={'30px'}>Add Friend</Button>
            </ConversationNavbar>

            <div className="Friends-container">
                {currentTab === 'friends' && <FriendsList />}
                {currentTab === 'pending' && <PendingList />}
            </div>

            <OnlineList online={online} />
        </div>
    );
}

export default FriendsTab;