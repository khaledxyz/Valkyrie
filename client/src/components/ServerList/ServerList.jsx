import { ServerIcon, HomeIcon, CreateServerIcon } from '../ServerIcon';
import { GiSteelwingEmblem } from 'react-icons/gi';
import { BsPlusLg } from 'react-icons/bs';
import { Separator } from '../Separator'
import './ServerList.scss';

const ServerList = () => {
    return (
        <div className="Server-list-wrapper">
            <aside className='Server-list'>
                <HomeIcon><GiSteelwingEmblem /></HomeIcon>
                <Separator width='40%' />
                <div className="servers">
                    <ServerIcon />
                    <ServerIcon />
                    <ServerIcon />
                    <ServerIcon />
                    <ServerIcon />
                    <ServerIcon />
                </div>
                <Separator width='40%' />
                <CreateServerIcon><BsPlusLg /></CreateServerIcon>
            </aside>
        </div>
    );
}

export default ServerList;