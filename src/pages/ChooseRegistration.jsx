import {Container, Row, Col, Button, Card} from 'react-bootstrap'
import { Navigate } from "react-router-dom";

import "../styles/Registration.scss";
import flag from "../images/flag.png";

const ChooseRegistration = () => {

    return (<>
        <section className="login-page-section">
        <Container>
          <Row>
            <Col className="col-md-8 col-lg-6 col-xl-4 offset-md-2 offset-lg-3 offset-xl-4">
              <Card className="card-thumbnail">
                <Card className="card-panel">
                  <Card.Header
                    className="card-header"
                    style={{ borderRadius: "0px" }}
                  >
                    <img
                      src={flag}
                      className="card-header-background-img"
                      alt="flag"
                    />
                    <h3 className="login-page-card-heading text-center mb-0">
                      Жүйеге тіркелу
                    </h3>
                    <p>
                      Жүйедегі керекті қызметтерге қол жеткізе алу үшін
                      тіркелуіңіз қажет
                    </p>
                  </Card.Header>
                  <Card.Body className="card-body">
                    {/* REGISTRATION FORM BEGIN */}
                    <div className="mb-3 ">
                        <a
                          href='/registration/for-individual'
                          className="btn btn-primary d-block w-100 login-submit-btn"
                        >
                          Жеке тұлға үшін
                        </a>
                        <br />
                        <a
                         href='/registration/for-entity'
                          className="btn btn-primary d-block w-100 login-submit-btn"
                        >
                          Заңды тұлға үшін
                        </a>
                      </div>
                      
                      
                    {/* REGISTRATION FROM END */}
                  </Card.Body>
                </Card>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>)
}

export default ChooseRegistration