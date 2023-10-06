import errorHandler from '@/helpers/errorHandler';
import styles from '@/styles/games/CoinCollector.module.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import QRCodeGenerator from '../games/QRCodeGenerator';

export default function InviteModal({ text, style, gameID }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const copyRoomID = () => {
        navigator.clipboard
            .writeText(gameID)
            .then(() => alert('ID copied!'))
            .catch((error) => {
                alert('Could not copy ID. Please copy it manually');
                errorHandler(error, 'InviteModal');
            });
    };

    return (
        <>
            <button onClick={handleShow} onTouchEnd={handleShow} className={style} data-testid="button">
                {text}
            </button>
            
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onTouchEnd={(e) => e.stopPropagation()}
                data-testid="modal"
            >
                <Modal.Header closeButton />
                <Modal.Body className={`${styles.logModal} text-center`}>
                    <Modal.Title>
                    Invite code:
                        <a className="link-secondary" onClick={copyRoomID}>
                            {gameID}
                        </a>
                    </Modal.Title>
                    <QRCodeGenerator show={show} />
                </Modal.Body>
            </Modal>
        </>
    );
}
