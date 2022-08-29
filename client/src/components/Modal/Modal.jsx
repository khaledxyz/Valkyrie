// * DEPENDENCIES * //
import ReactDom from 'react-dom';
import { motion } from 'framer-motion';

// * COMPONENTS * //
import Button from '../../components/Button';
import { AiOutlineClose } from 'react-icons/ai';

// * STYLES * //
import './Modal.scss';

const Modal = ({ children, title, action, handleSubmit, isModalOpen, close }) => {
    if (!isModalOpen) return;

    const handleClose = (e) => {
        if (e.target.classList[0] !== 'Overlay') return;
        close();
    };

    return ReactDom.createPortal(
        <>
            <div className="Overlay" onClick={handleClose} >
                <motion.div className="Modal"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                >
                    <div className="Modal__header">
                        {title}
                        <AiOutlineClose onClick={close} />
                    </div>

                    <div className="Modal__body">{children}</div>

                    <div className="Modal__footer">
                        <Button onClick={handleSubmit} width={'90px'} height={'45px'}>{action}</Button>
                    </div>
                </motion.div>
            </div>
        </>,
        document.getElementById('modalPortal')
    );
}

export default Modal;