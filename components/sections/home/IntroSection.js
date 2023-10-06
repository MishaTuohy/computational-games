import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/pages/Home.module.css';
import { textConfig } from '@/domain/config/text.config';

export default function IntroSection() {
    const text = textConfig.PAGES.HOME.INTRO;

    return (
        <section className={styles.sectionBlue} id="hero" data-testid="intro-section">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <div className="pr-lg-5">
                            <p className="text-uppercase text-light font-weight-medium f-14 mb-4">{text.TITLE1}</p>
                            <h1 className="mb-4 font-weight-normal line-height-1_4"><span className="text-warning">{text.TITLE2}</span> <span className="text-light font-weight-medium">{text.TITLE3}</span></h1>
                            <p className="text-light mb-4 pb-2">{text.DESC}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mt-5 mt-lg-0">
                            <img src={text.IMG} alt="" className="img-fluid mx-auto d-block"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
