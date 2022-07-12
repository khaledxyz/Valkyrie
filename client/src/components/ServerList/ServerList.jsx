import { ServerIcon, HomeIcon } from '../ServerIcon';
import './ServerList.scss';

const ServerList = () => {
    return (
        <div className="Server-list-wrapper">
            <aside className='Server-list'>
                <HomeIcon>V</HomeIcon>
                <div>--</div>
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
                <ServerIcon />
            </aside>
        </div>
    );
}

export default ServerList;