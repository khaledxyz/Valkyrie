import { BsFillPersonLinesFill } from 'react-icons/bs';
import { Separator } from '../../Separator';
import { SidebarButton, Conversation } from "../SidebarButton";
import { ProfileIcon } from '../../ProfileIcon';
import { useNavigate } from 'react-router-dom'
import './HomeSidebar.scss';

const HomeSidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="HomeSidebar">
            <SidebarButton onClick={() => navigate('')}>
                <BsFillPersonLinesFill />Friends
            </SidebarButton>
            <Separator width='40%' />
            <Conversation>
                <ProfileIcon />
                <p>Khaled</p>
            </Conversation>
        </div>
    );
}

export default HomeSidebar;