import React from "react";
import { Container, Row, Col, Card, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { fetchRegister, selectIsAuth } from "../redux/slices/auth.js";
import "../styles/Registration.scss";
import flag from "../images/flag.png";

const IndividualRegister = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [matchedPass, setMatchedPass] = React.useState(true);

  const [errorMessage, setErrorMessage] = React.useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstname: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    if (values.password === values.confirmPass) {
      const data = await dispatch(
        fetchRegister({
          firstname: values.firstname,
          email: values.email,
          password: values.password,
        })
      );

      setErrorMessage(data.payload.message)

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
    } else {
      setMatchedPass(false);
    }
  };

  console.log(errorMessage && errorMessage)

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
                      Жүйеге тіркелу
                    </h3>
                    <p>
                      Жүйедегі керекті қызметтерге қол жеткізе алу үшін
                      тіркелуіңіз қажет
                    </p>
                  </Card.Header>
                  <Card.Body className="card-body">
                    {/* REGISTRATION FORM BEGIN */}
                    <Form onSubmit={handleSubmit(onSubmit)} method="post">
                      <Form.Group className="mb-3 ">
                        <Form.Label>Жеке тұлға үшін</Form.Label>
                        <Form.Control
                          style={
                            Boolean(errors.firstname?.message)
                              ? { borderColor: "#ED474A" }
                              : { borderColor: "#0E6BA8" }
                          }
                          className=" firstname-input"
                          type="text"
                          {...register("firstname", {
                            required: "Атыңызды енгізіңіз",
                            minLength: {
                              value: 2,
                              message: 'Атыңыз 2 және 30 символ арасында болуы керек'
                            },
                            maxLength: {
                              value: 30,
                              message: 'Атыңыз 2 және 30 символ арасында болуы керек'
                            }
                          })}
                          placeholder="Атыңыз"
                        />

                        {Boolean(errors.firstname?.message) ? (
                          <Form.Label style={{ color: "#EF393B" }}>
                            {errors.firstname?.message}
                          </Form.Label>
                        ) : (
                          ""
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3 ">
                        
                        <Form.Control
                          style={
                            Boolean(errors.email?.message)
                              ? { borderColor: "#ED474A" }
                              : { borderColor: "#0E6BA8" }
                          }
                          className="form-control email-input"
                          type="email"
                          {...register("email", {
                            required: "Поштаңызды енгізіңіз",
                            pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Дұрыс форматты енгізіңіз'
                            }
                          })}
                          placeholder="Поштаңыз"
                        />

                        {Boolean(errors.email?.message) ? (
                          <Form.Label style={{ color: "#ED474A" }}>
                            {errors.email?.message}
                          </Form.Label>
                        ) : (
                          ""
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">

                        <Form.Control
                          style={
                            Boolean(errors.password?.message)
                              ? { borderColor: "#ED474A" }
                              : { borderColor: "#0E6BA8" }
                          }
                          className="form-control password-input"
                          type="password"
                          {...register("password", {
                            required: "Құпия сөзді енгізіңіз",
                            minLength: {
                              value: 6,
                              message: 'Құпия сөз 6 және 16 символ арасында болуы керек'
                            },
                            maxLength: {
                              value: 16,
                              message: 'Атыңыз 6 және 16 символ арасында болуы керек'
                            }
                          })}
                          placeholder="Құпия сөз"
                        />
                        {Boolean(errors.password?.message) ? (
                          <Form.Label style={{ color: "#ED474A" }}>
                            {errors.password?.message}
                          </Form.Label>
                        ) : (
                          ""
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">

                        <Form.Control
                          style={
                            Boolean(errors.confirmPass?.message)
                              ? { borderColor: "#ED474A" }
                              : { borderColor: "#0E6BA8" }
                          }
                          className="form-control password-input"
                          type="password"
                          {...register("confirmPass", {
                            required: "Құпия сөзді қайта енгізіңіз",
                            validate: (val) => {
                              if (watch("password") !== val) {
                                return "Құпия сөздер сәйкес келмейді";
                              }
                            },
                          })}
                          placeholder="Құпия сөзді қайталаңыз"
                        />
                        {Boolean(errors.confirmPass?.message) ? (
                          <Form.Label style={{ color: "#ED474A" }}>
                            {errors.confirmPass?.message}
                          </Form.Label>
                        ) : (
                          ""
                        )}

                        {!matchedPass ? (
                          <Form.Label style={{ color: "#ED474A" }}>
                            Құпия сөздер сәйкес келмейді
                          </Form.Label>
                        ) : (
                          ""
                        )}
                      </Form.Group>

                      <div className="mb-3 ">
                        <button
                          disabled={!isValid}
                          className="btn btn-primary d-block w-100 login-submit-btn"
                          type="submit"
                        >
                          { "Тіркелу" }
                        </button>
                      </div>
                      <p className="text-muted">Жүйеге тіркелгенсіз ба? <a href="/login">Кіру</a></p>
                    </Form>
                    {/* REGISTRATION FROM END */}
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

export default IndividualRegister;
