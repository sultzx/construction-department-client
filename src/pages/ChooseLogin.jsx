import React from "react";
import { Container, Row, Col, Card, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import {  selectIsAuth } from "../redux/slices/auth.js";
import "../styles/Login.scss";
import flag from "../images/flag.png";

const ChooseLogin = () => {

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [errorMessage, setErrorMessage] = React.useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });


  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <Alert  
      variant={errorMessage && errorMessage ? 'danger' : 'primary'}
      style={errorMessage && errorMessage ? { borderRadius: '1px', borderColor: 'red'} : { borderRadius: '1px'}}> {
      
        (<div className="text-center" style={{margin: '-12px'}}>
          {errorMessage && <span>{errorMessage}</span>}
        </div>)
      
    }</Alert>
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
                      Жүйеге кіру
                    </h3>
                    <p>
                      Жүйедегі керекті қызметтерге қол жеткізе алу үшін кіруіңіз
                      қажет
                    </p>
                  </Card.Header>
                  <Card.Body className="card-body">
                    {/* LOGIN FORM BEGIN */}
                    <div className="mb-3 ">
                        <a
                          href='/login/for-individual'
                          className="btn btn-primary d-block w-100 login-submit-btn"
                        >
                          Жеке тұлға үшін
                        </a>
                        <br />
                        <a
                         href='/login/for-entity'
                          className="btn btn-primary d-block w-100 login-submit-btn"
                        >
                          Заңды тұлға үшін
                        </a>
                      </div>
                      
                    {/* LOGIN FROM END */}
                  </Card.Body>
                </Card>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ChooseLogin;
