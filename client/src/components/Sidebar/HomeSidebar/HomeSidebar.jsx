import { BsFillPersonLinesFill } from 'react-icons/bs';
import { Separator } from '../../separator';
import { SidebarButton, Conversation } from "../../SidebarButton";
import { ProfileIcon } from '../../ProfileIcon';

import './HomeSidebar.scss';

const HomeSidebar = () => {
    return ( 
        <div className="HomeSidebar">
            <SidebarButton><BsFillPersonLinesFill />Friends</SidebarButton>
            <Separator width='40%' />
            <Conversation>
                <ProfileIcon />
                <p>Khaled</p>
            </Conversation>
        </div>
     );
}
 
export default HomeSidebar;