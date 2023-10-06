import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/pages/Home.module.css';
import { textConfig } from '@/domain/config/text.config';

export default function AimSection() {
    const text = textConfig.PAGES.HOME.AIM;
    const aims = text.AIMS;
  
    return (
        <section className={styles.section} id="aims" data-testid="aim-section">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6} md={8}>
                        <div className="title text-center mb-5">
                            <h3 className="font-weight-normal text-dark"><span className="text-warning">{text.TITLE}</span></h3>
                            <p className="text-muted">{text.DESC}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {aims.map((aim, key) => (
                        <Col key={key} lg={4} md={6}>
                            <div>
                                <h5 className="text-dark font-weight-normal pt-1 mb-4">{aim.title}</h5>
                                <p className="text-muted mb-4">{aim.desc}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}
