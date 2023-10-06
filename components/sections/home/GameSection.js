import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/pages/Home.module.css';
import StartGameModal from '@/components/modals/StartGameModal';
import { textConfig } from '@/domain/config/text.config';

const text = textConfig.PAGES.HOME.GAMES;
const games = text.GAMES_LIST;

export default function GameSection() {
    return (
        <section className={styles.sectionGrey} id="games">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6} md={8}>
                        <div className="title text-center mb-5">
                            <h3 className="font-weight-normal text-dark"><span className="text-warning">{text.TITLE}</span></h3>
                            <p className="text-dark">{text.GAMES_SUPPORT}</p>
                        </div>
                    </Col>
                </Row>
                <Game games={games} data-testid="game-section"/>
            </Container>
        </section>
    );
}

function Game(props){
    return (
        <>
            {
                props.games.map((feature, key) =>
                    (feature.id % 2 !== 0) ?
                        <Row key={key} className={feature.id === 1 ? 'align-items-center' : 'align-items-center mt-5'}>
                            <Col md={5} >
                                <div>
                                    <img 
                                        src={feature.img} 
                                        alt="" 
                                        className="img-fluid d-block mx-auto"
                                        width="250"
                                        height="250"
                                    />
                                </div>
                            </Col>
                            <Col md={{size:6, offset:1}}>
                                <div className="mt-5 mt-sm-0 mb-4">
                                    <div className="my-4">
                                        <i className={feature.icon}></i>
                                    </div>
                                    <h5 className="text-dark font-weight-normal mb-3 pt-3">{feature.title}</h5>
                                    <p className="text-dark mb-3 f-15">{feature.desc}</p>
                                    <StartGameModal text={feature.buttonText} gameName={feature.game}/>
                                </div>
                            </Col>
                        </Row>
                        :
                        <Row key={key} className="align-items-center mt-5">
                            <Col md={6}>
                                <div className="mb-4">
                                    <div className="my-4">
                                        <i className="mdi mdi-account-group"></i>
                                    </div>
                                    <h5 className="text-dark font-weight-normal mb-3 pt-3">{feature.title}</h5>
                                    <p className="text-dark mb-3 f-15">{feature.desc}</p>
                                    <StartGameModal text={feature.buttonText} gameName={feature.game}/>
                                </div>
                            </Col>
                            <Col md={{size:5, offset:1}} className="mt-5 mt-sm-0">
                                <div>
                                    <img 
                                        src={feature.img} 
                                        alt="" 
                                        className="img-fluid d-block mx-auto"
                                        width="200"
                                        height="200"
                                    />
                                </div>
                            </Col>
                        </Row>
                )
            }
        </>
    );
}
