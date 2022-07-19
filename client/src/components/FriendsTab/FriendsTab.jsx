// * DEPENDENCIES * //
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// * REDUX SLICE * //
import { sendFriendRequest } from '../../features/friends/friendsSlice';

// * COMPONENTS * //
import Button from '../Button';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';

// * STYLES * //
import './FriendsTab.scss';
import FriendsList from './FriendsList';


const FriendsTab = () => {
    const dispatch = useDispatch();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('friends');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendFriendRequest(username));
    };

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
                    onChange={e => setUsername(e.target.value)} 
                    username={username}
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