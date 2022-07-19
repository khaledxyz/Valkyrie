// * COMPONENTS * //
import Button from '../../components/Button';
import { AiOutlineClose } from 'react-icons/ai';
import './Modal.scss';

const Modal = ({children, title, action, handleSubmit, isModalOpen, close}) => {
    if(!isModalOpen) return;

    return (
        <>
            <div className="Overlay" onClick={close}></div>

            <div className="Modal">
                <div className="Modal__header">
                    {title}
                    <AiOutlineClose onClick={close}/>
                </div>

                <div className="Modal__body">{children}</div>

                <div className="Modal__footer">
                    <Button onClick={handleSubmit} width={'90px'} height={'45px'}>{action}</Button>
                </div>
            </div>
        </>
     );
}
 
export default Modal;