// * DEPENDENCIES * //
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getAllGuilds } from '../../features/guilds/guildsSlice';

// * COMPONENTS * //
import { ServerIcon, HomeIcon, CreateServerIcon } from '../ServerIcon';
import { Separator } from '../Separator'

// * STYLES * //
import './ServerList.scss';

// * ICONS * //
import { GiSteelwingEmblem } from 'react-icons/gi';
import { BsPlusLg } from 'react-icons/bs';


const ServerList = () => {
    const dispatch = useDispatch();
    const { guilds } = useSelector(state => state.guilds);

    useEffect(() => {
        dispatch(getAllGuilds());
    }, []);

    return (
        <div className="Server-list-wrapper">
            <aside className='Server-list'>
                <HomeIcon><GiSteelwingEmblem /></HomeIcon>
                <Separator width='40%' />
                <div className="servers">{
                    guilds.map(guild => {
                        // return <ServerIcon key={guild._id} guild={guild}/>
                        console.log(guild.serverIcon.data);
                    })
                }</div>
                <Separator width='40%' />
                <CreateServerIcon><BsPlusLg /></CreateServerIcon>
            </aside>
        </div>
    );
}

export default ServerList;