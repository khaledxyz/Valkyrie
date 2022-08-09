import Button from '../Button';
import Input from '../Input/Input';
import { ProfileIcon } from '../ProfileIcon';
import './Conversation.scss';

const Conversation = ({ friendID }) => {
    return (
        <div className="Conversation">
            <div className='Conversation__Navbar'>
                <p>{friendID}</p>
            </div>

            <div className="Conversation__messages">
                <div className="message">
                    <ProfileIcon className='icon' />
                    <div className="message__content">
                        <p className='username'>{friendID}</p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed a, dolorem earum obcaecati recusandae odio accusamus similique provident magnam voluptates? Accusamus omnis voluptatibus modi culpa inventore optio? Eos repudiandae expedita libero fuga magni culpa facilis praesentium distinctio minus fugiat dignissimos pariatur, in minima officiis beatae magnam! Quasi architecto hic ipsum?
                    </div>
                </div>
            </div>

            <div className='Conversation__Footer'>
                <Input
                    placeholder={`Message ${friendID}`}
                />
            </div>
        </div>
    );
}

export default Conversation;