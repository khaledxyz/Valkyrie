import { ServerIcon, HomeIcon, CreateServerIcon } from '../ServerIcon';
import { GiSteelwingEmblem } from 'react-icons/gi';
import { BsPlusLg } from 'react-icons/bs';
import './ServerList.scss';

const ServerList = () => {
    return (
        <div className="Server-list-wrapper">
            <aside className='Server-list'>
                <HomeIcon><GiSteelwingEmblem /></HomeIcon>
                <div className='separator'></div>
                <div className="servers">
                    <ServerIcon />
                    <ServerIcon />
                    <ServerIcon />
                    <ServerIcon />
                    <ServerIcon />
                    <ServerIcon />
                </div>
                <div className='separator'></div>
                <CreateServerIcon><BsPlusLg /></CreateServerIcon>
            </aside>
        </div>
    );
}

export default ServerList;