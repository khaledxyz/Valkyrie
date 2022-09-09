import { Channel, SidebarButton } from "../SidebarButton";
import { RiHashtag } from 'react-icons/ri';
import { BsPlusLg } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { getGuildChannels, createChannel } from '../../../features/guilds/guildsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Separator } from '../../Separator';
import Modal from '../../Modal/Modal';
import Input from "../../Input/Input";
import { useNavigate, useParams } from "react-router-dom";
import './GuildSidebar.scss';

const GuildSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { guildID } = useParams();
    const { channels } = useSelector((state) => state.guilds);
    const [channelName, setChannelName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getGuildChannels(guildID));
    }, [guildID]);

    const handleSubmit = () => {
        dispatch(createChannel({ guildID, name: channelName }));
        setIsModalOpen(false);
    };

    const isActive = (channelID) => {
        const path = location.pathname;
        if (path.includes(channelID)) return 'active';
    };

    return (
        <>
            <Modal
                isModalOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title={'Create a new channel'}
                action={'Create'}
                handleSubmit={handleSubmit}
            >
                <Input
                    type={'text'}
                    label={'Channel name'}
                    required={true}
                    placeholder={'new-channel'}
                    onChange={(e) => {
                        const name = e.target.value.replace(/\s+/g, '-').replace().toLowerCase();
                        setChannelName(name);
                    }}
                    value={channelName}
                ></Input>
            </Modal>

            <div className="GuildSidebar">
                <SidebarButton onClick={() => setIsModalOpen(true)}><BsPlusLg />New channel</SidebarButton>
                <Separator width='40%' />
                {
                    channels && channels?.map((channel) => (
                        <Channel className={isActive(channel._id)} onClick={() => navigate(channel._id)} key={channel._id}><RiHashtag />{channel.name}</Channel>
                    ))
                }
            </div>
        </>
    );
}

export default GuildSidebar;
            // {/* <Channel><RiHashtag />Hi</Channel> */}