import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import styles from '@/styles/Error404.module.css';

export default function Error404() {
    return (
        <Container>
            <Row className={styles.row}>
                <Col xs={12} className="text-center">
                    <h1 className={styles.errorCode}>404</h1>
                    <h2 className={styles.errorMessage}>Page Not Found</h2>
                    <p className={styles.errorDescription}>
                        The page you are looking for does not exist or has been moved.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
