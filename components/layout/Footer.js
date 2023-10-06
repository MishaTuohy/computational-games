import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '@/styles/components/Footer.module.css';
import { textConfig } from '@/domain/config/text.config';

export default function Footer() {
    const text = textConfig.COMMON.FOOTER;
    return (
        <section className={styles.footer} data-testid="footer">
            <Container>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <p className="text-light text-center">{text.UNIVERSITY}</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
