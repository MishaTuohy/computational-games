import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/pages/Home.module.css';
import Link from 'next/link';

export default function AboutSection() {
    return (
        <section className={styles.section} id="about">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6} md={8}>
                        <div className="title text-center mb-5">
                            <h3 className="font-weight-normal text-dark"><span className="text-warning">Ref</span>erences</h3>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ size:7, offset :1 }}>
                        <Row>
                            <Col md={6}>
                                <h6 className="text-dark font-weight-light f-20 mb-3">Repository</h6>
                                <p className="text-muted font-weight-light">Click <Link href="https://gitlab.com/MishaTuohy/mu-computational-thinking-app">here</Link> to view the source code for this project.</p>
                            </Col>
                            <Col md={6}>
                                <h6 className="text-dark font-weight-light f-20 mb-3">Documentation</h6>
                                <p className="text-muted font-weight-light">If you are not familiar with programming you can still view the <Link href="https://mu-computational-thinking-docs.web.app/">Documentation</Link> .</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
