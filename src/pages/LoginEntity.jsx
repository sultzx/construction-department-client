import React from "react";
import { Container, Row, Col, Card, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { fetchAuth, fetchAuthEntity, selectIsAuth } from "../redux/slices/auth.js";
import "../styles/Login.scss";
import flag from "../images/flag.png";

const LoginEntity = () => {

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

  const onSubmit = async (values) => {

    const data = await dispatch(fetchAuthEntity(values));

    setErrorMessage(data.payload.message)

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

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
                    <Form onSubmit={handleSubmit(onSubmit)} method="post">

                      <Form.Group className="mb-3 ">
                      <Form.Label >Заңды тұлға үшін</Form.Label>
                        {Boolean(errors.email?.message) ?
                        <Form.Label style={{color: 'red'}}>{errors.email?.message}</Form.Label> : ''}
                        <Form.Control 
                            style={Boolean(errors.email?.message) ? { borderColor: "red", } : { borderColor: "#0E6BA8" }} 
                            className="form-control email-input" 
                            type="email" 
                            {...register("email", { required: "Поштаңызды енгізіңіз" })}
                            placeholder="Пошта" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                      {Boolean(errors.password?.message) ?
                        <Form.Label style={{color: 'red'}}>{errors.password?.message}</Form.Label> : ''}
                        <Form.Control
                            style={Boolean(errors.password?.message) ? { borderColor: "red", } : { borderColor: "#0E6BA8" }}  
                            className="form-control password-input" 
                            type="password" 
                            {...register("password", { required: "Құпия сөзді енгізіңіз" })}
                            placeholder="Құпия сөз" />
                      </Form.Group>

                      <div className="mb-3 ">
                        <button
                          disabled={!isValid}
                          className="btn btn-primary d-block w-100 login-submit-btn"
                          type="submit"
                        >
                          Кіру
                        </button>
                      </div>
                      <p className="text-muted">Жүйеде жоқсыз ба? <a href="/login">Тіркелу</a></p>
                    </Form>
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

export default LoginEntity;
