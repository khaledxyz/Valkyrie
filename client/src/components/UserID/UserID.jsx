import { useSelector } from 'react-redux';
import { useState } from 'react';
import { TbLogout } from 'react-icons/tb';
import './UserID.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import Button from '../Button';
import { ProfileIcon } from '../ProfileIcon';
import { useNavigate } from 'react-router-dom';

const UserID = () => {
    const [tippy, setTippy] = useState(false);

    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const handleClick = () => {
        setTippy(true);
        setTimeout(() => {
            setTippy(false);
        }, 1000);
        const fullUsername = user?.details.username + user?.details.tag;
        navigator.clipboard.writeText(fullUsername);
    };

    const logOut = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="UserID">
            <div className="UserID__left">
                <ProfileIcon className="avatar" avatar={user?.details.avatar} />
                <Tippy content="Copied!" visible={tippy} theme="valkyrie">
                    <div className="details" onClick={handleClick}>
                        <p>{user?.details.username}</p>
                        <h6>{user?.details.tag}</h6>
                    </div>
                </Tippy>
            </div>

            <div className="logout">
                <Button
                    onClick={logOut}
                    variant={'danger'}
                    height={'30px'}
                    width={'30px'}
                >
                    <TbLogout />
                </Button>
            </div>
        </div>
    );
};

export default UserID;
