import CreateGameButton from '@/components/buttons/CreateGameButton';
import JoinGameButton from '@/components/buttons/JoinGameButton';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

export default function StartGameModal({text, gameName}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
            <div className="btn btn-warning" onClick={handleShow} data-testid="button">{text}</div>
            <Container data-testid="modal">
                <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Body className='login-modal'>
                        <Modal.Title>
                            {gameName}
                            <hr />
                        </Modal.Title>
                        <Container className='invite-container'>
                            <CreateGameButton game={gameName}/>
                            <JoinGameButton game={gameName}/>
                        </Container>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
}
