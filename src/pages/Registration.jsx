import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { fetchRegister, selectIsAuth } from "../redux/slices/auth.js";
import "../styles/Registration.scss";
import flag from "../images/flag.png";

const Registration = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstname: "",
      email: "",
      password: "",
      confirmPass: ""
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {

    if (values.password === values.confirmPass ) {

        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
        return window.alert("Авторизация жок");
        }

        if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
        }
    
    } else {
        alert('pass!')
    }

  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
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
                        {Boolean(errors.firstname?.message) ? (
                          <Form.Label style={{ color: "red" }}>
                            {errors.firstname?.message}
                          </Form.Label>
                        ) : (
                          ""
                        )}
                        <Form.Control
                          style={
                            Boolean(errors.firstname?.message)
                              ? { borderColor: "red" }
                              : { borderColor: "#0E6BA8" }
                          }
                          className=" firstname-input"
                          type="text"
                          {...register("firstname", {
                            required: "Атыңызды енгізіңіз",
                          })}
                          placeholder="Атыңыз"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3 ">
                        {Boolean(errors.email?.message) ? (
                          <Form.Label style={{ color: "red" }}>
                            {errors.email?.message}
                          </Form.Label>
                        ) : (
                          ""
                        )}
                        <Form.Control
                          style={
                            Boolean(errors.email?.message)
                              ? { borderColor: "red" }
                              : { borderColor: "#0E6BA8" }
                          }
                          className="form-control email-input"
                          type="email"
                          {...register("email", {
                            required: "Поштаңызды енгізіңіз",
                          })}
                          placeholder="Поштаңыз"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        {Boolean(errors.password?.message) ? (
                          <Form.Label style={{ color: "red" }}>
                            {errors.password?.message}
                          </Form.Label>
                        ) : (
                          ""
                        )}
                        <Form.Control
                          style={
                            Boolean(errors.password?.message)
                              ? { borderColor: "red" }
                              : { borderColor: "#0E6BA8" }
                          }
                          className="form-control password-input"
                          type="password"
                          {...register("password", {
                            required: "Құпия сөзді енгізіңіз",
                          })}
                          placeholder="Құпия сөз"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        {Boolean(errors.confirmPass?.message) ? (
                          <Form.Label style={{ color: "red" }}>
                            {errors.confirmPass?.message}
                          </Form.Label>
                        ) : (
                          ""
                        )}
                        <Form.Control
                          style={
                            Boolean(errors.confirmPass?.message)
                              ? { borderColor: "red" }
                              : { borderColor: "#0E6BA8" }
                          }
                          className="form-control password-input"
                          type="password"
                          {...register("confirmPass", {
                            required: "Құпия сөзді енгізіңіз",
                          })}
                          placeholder="Құпия сөзді қайталаңыз"
                        />
                      </Form.Group>

                      <div className="mb-3 ">
                        <button
                          disabled={!isValid}
                          className="btn btn-primary d-block w-100 login-submit-btn"
                          type="submit"
                        >
                          Тіркелу
                        </button>
                      </div>
                      <p className="text-muted">Құпия сөзді ұмыттыңыз ба?</p>
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

export default Registration;
