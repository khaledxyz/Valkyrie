import Button from '../Button';
import { Friend } from './Friend';
import { ProfileIcon } from '../ProfileIcon';
import './FriendsList.scss';

const FriendsList = () => {
    return ( 
        <div className="FriendsList">
            <nav className="Navbar">
                <p>Home</p>
            </nav>

            <div className="Friends-container">
                <Friend>
                    <ProfileIcon /> 
                    <p>Khaled</p>
                    <Button variant={'danger'} width={'80px'} height={'30px'}>Remove</Button>
                </Friend>
                <Friend>
                    <ProfileIcon /> 
                    <p>Khaled</p>
                    <Button variant={'danger'} width={'80px'} height={'30px'}>Remove</Button>
                </Friend>
            </div>
        </div>
     );
}
 
export default FriendsList;