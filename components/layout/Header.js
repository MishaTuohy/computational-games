import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
    return (
        <section className='border-bottom' id="header" data-testid="header">
            <Navbar bg="white" expand="md" sticky="top" >
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="/logo.png"
                            width="52"
                            height="32"
                            className="d-inline-block align-top"
                            alt="logo"
                        />{' '}
                        Computational Thinking Games
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </section>
    );
}
