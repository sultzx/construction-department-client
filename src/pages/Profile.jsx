import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Breadcrumb,
  Alert,
  Card,
  Form,
  Button,
  Nav,
  Tab,
  Tabs,
} from "react-bootstrap";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectIsAuth, fetchUpdateMe, fetchAuthMe } from "../redux/slices/auth";
import "../styles/index.scss";
import "../styles/Profile.scss";
import blueProfile from "../images/blue-profile.png";
import create_document from "../images/create_document.png";
import read_document from "../images/read_document.png";
import update_document from "../images/update_document.png";
import delete_document from "../images/delete_document.png";

import axios from "../axios.js";

const Profile = () => {
  const isAuth = useSelector(selectIsAuth);

  const userData = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();

  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/avatar", formData);
      console.log(data.url);
    } catch (error) {
      console.warn(error);
      alert("Uploading image error");
    }
    dispatch(fetchAuthMe());
  };

  const onClickRemoveImage = async () => {
    await axios.patch("/api/auth/delete-avatar");
    dispatch(fetchAuthMe());
  };

  const [responseMessage, setResponseMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      lastname: userData && userData.lastname,
      firstname: userData && userData.firstname,
      patronymic: userData && userData.patronymic,
      phone: userData && userData.phone,
      address_region: userData && userData.address && userData.address.region,
      address_city: userData && userData.address && userData.address.city,
      address_street: userData && userData.address && userData.address.street,
      address_home: userData && userData.address && userData.address.home,
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(
      fetchUpdateMe({
        lastname: values.lastname,
        firstname: values.firstname,
        patronymic: values.patronymic,
        phone: values.phone,
        address: {
          region: values.address_region,
          city: values.address_city,
          street: values.address_street,
          home: values.address_home,
        },
      })
    );

    dispatch(fetchAuthMe());

    setResponseMessage(data.payload.message);

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  return (
    <>
      <section>
        {!isAuth ? (
          <Alert
            variant={"warning"}
            style={{ borderRadius: "1px", borderColor: "yellow" }}
          >
            {
              <div className="text-center" style={{ margin: "-12px" }}>
                <span>
                  Жүйедегі толық ақпараттарға қол жеткізу үшін тіркеліңіз немесе
                  кіріңіз
                </span>
              </div>
            }
          </Alert>
        ) : (
          <Alert
            variant={responseMessage ? "success" : "primary"}
            style={{ borderRadius: "1px" }}
          >
            {
              <div className="text-center" style={{ margin: "-12px" }}>
                {responseMessage && <span>{responseMessage}</span>}
              </div>
            }
          </Alert>
        )}
        <Container>
          <Breadcrumb className="breadcrumb-component">
            <Breadcrumb.Item>
              <Link to={"/main"} className="breadcrumb-component-item">
                Басты бет
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              active="true"
              className="breadcrumb-component-item"
              style={{ color: "#267DB5" }}
            >
              Жеке профиль
            </Breadcrumb.Item>
          </Breadcrumb>
          <hr className="basic-hr" />
          <Row>
            <Col lg={4} md={6} sm={6} xs={12}>
              <Card
                className={`profile-page-card 
              ${userData && userData.role === "user" && "for-user"} 
              ${userData && userData.role === "moderator" && "for-moderator"}  
              ${userData && userData.role === "admin" && "for-admin"}
              `}
              >
                <Card.Body>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="circular--landscape">
                      <Card.Img
                        onClick={() =>
                          document.onload(
                            `http://localhost:4444${
                              userData && userData.avatarUrl
                            }`
                          )
                        }
                        src={
                          userData && userData.avatarUrl
                            ? `http://localhost:4444${userData.avatarUrl}`
                            : blueProfile
                        }
                      />
                    </div>
                    {/* <Card.Title
                      className="text-center"
                      style={{
                        color: "black",
                      }}
                    >
                      {userData && userData.lastname ? userData.lastname : ""}{" "}
                      {userData && userData.firstname
                        ? userData.firstname
                        : " "}{" "}
                    </Card.Title> */}
                  </div>
                </Card.Body>
                <div className="d-flex justify-content-end card-footer-btn">
                  <ButtonGroup>
                    <button
                      onClick={() => {
                        onClickRemoveImage();
                      }}
                      className="btn btn-primary d-block  remove-img-btn"
                    >
                      Өшіру
                    </button>
                    <button
                      onClick={() => {
                        inputFileRef.current.click();
                      }}
                      className="btn btn-primary d-block  upload-btn"
                    >
                      Жүктеу
                    </button>
                  </ButtonGroup>

                  <input
                    type="file"
                    ref={inputFileRef}
                    onChange={handleChangeFile}
                    hidden
                  />
                </div>
              </Card>
            </Col>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Col lg={8} md={6} sm={6} xs={12}>
              <Form onSubmit={handleSubmit(onSubmit)} method="post">
                <Card className="profile-page-card">
                  <Card.Body>
                    <div className="d-flex flex-column justify-content-center">
                      <Row>
                        {/* //////////////////////////////////// */}
                        <Col xs={12} sm={12} md={4} lg={4}>
                          <Form.Label>Фамилияңыз</Form.Label>
                          <Form.Control
                            style={
                              Boolean(errors.lastname?.message)
                                ? { borderColor: "#ED474A" }
                                : { borderColor: "#0E6BA8" }
                            }
                            className="firstname-input"
                            type="text"
                            placeholder={userData && userData.lastname}
                            {...register("lastname", {
                              required: "Фамилияңызды енгізіңіз",
                              minLength: {
                                value: 2,
                                message:
                                  "Фамилияңыз 2 және 30 символ арасында болуы керек",
                              },
                              maxLength: {
                                value: 30,
                                message:
                                  "Атыңыз 2 және 30 символ арасында болуы керек",
                              },
                            })}
                          />
                          {Boolean(errors.lastname?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.lastname?.message}
                            </Form.Label>
                          ) : (
                            ""
                          )}
                        </Col>
                        {/* ////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={4} lg={4}>
                          <Form.Label>Атыңыз</Form.Label>
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
                                message:
                                  "Атыңыз 2 және 30 символ арасында болуы керек",
                              },
                              maxLength: {
                                value: 30,
                                message:
                                  "Атыңыз 2 және 30 символ арасында болуы керек",
                              },
                            })}
                            placeholder={userData && userData.firstname}
                          />
                          {Boolean(errors.firstname?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.firstname?.message}
                            </Form.Label>
                          ) : (
                            ""
                          )}
                        </Col>
                        {/* ////////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={4} lg={4}>
                          <Form.Label>Әкеңіздің аты</Form.Label>
                          <Form.Control
                            style={
                              Boolean(errors.patronymic?.message)
                                ? { borderColor: "#ED474A" }
                                : { borderColor: "#0E6BA8" }
                            }
                            className=" firstname-input"
                            placeholder={userData && userData.patronymic}
                            type="text"
                            {...register("patronymic")}
                          />
                          {Boolean(errors.patronymic?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.patronymic?.message}
                            </Form.Label>
                          ) : (
                            ""
                          )}
                        </Col>
                        {/* //////////////////////////////////////////// */}
                        <Col className="col-12">
                          <hr className="basic-hr" />
                        </Col>
                      </Row>
                      <Row>
                        {/* //////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={4} lg={4}>
                          <Form.Label>Телефон</Form.Label>
                          <Form.Control
                            style={
                              Boolean(errors.phone?.message)
                                ? { borderColor: "#ED474A" }
                                : { borderColor: "#0E6BA8" }
                            }
                            className=" firstname-input"
                            type="phone"
                            placeholder={userData && userData.phone}
                            {...register("phone", {
                              required: "Телефон нөміріңізді енгізіңіз",
                              maxLength: {
                                value: 11,
                                message:
                                  "Телефон нөміріңіз 11 саннан кем болмауы керек",
                              },
                            })}
                          />
                          {Boolean(errors.phone?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.phone?.message}
                            </Form.Label>
                          ) : (
                            ""
                          )}
                        </Col>

                        {/* //////////////////////////////////////////// */}
                        <Col className="col-12">
                          <hr className="basic-hr" />
                        </Col>
                      </Row>
                      <Row>
                        {/* //////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={3} lg={3}>
                          <Form.Label>Облыс</Form.Label>
                          <Form.Control
                            style={
                              Boolean(errors.address_region?.message)
                                ? { borderColor: "#ED474A" }
                                : { borderColor: "#0E6BA8" }
                            }
                            className=" firstname-input"
                            placeholder={
                              userData &&
                              userData.address &&
                              userData.address.region
                            }
                            type="text"
                            {...register("address_region", {
                              required: "Облысты енгізіңіз",
                            })}
                          />
                          {Boolean(errors.address_region?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.address_region?.message}
                            </Form.Label>
                          ) : (
                            ""
                          )}
                        </Col>
                        {/* //////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={3} lg={3}>
                          <Form.Label>Қала</Form.Label>
                          <Form.Control
                            style={
                              Boolean(errors.address_city?.message)
                                ? { borderColor: "#ED474A" }
                                : { borderColor: "#0E6BA8" }
                            }
                            className=" firstname-input"
                            type="text"
                            placeholder={
                              userData &&
                              userData.address &&
                              userData.address.city
                            }
                            {...register("address_city", {
                              required: "Қала атын енгізіңіз",
                            })}
                          />
                          {Boolean(errors.address_city?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.address_city?.message}
                            </Form.Label>
                          ) : (
                            ""
                          )}
                        </Col>
                        {/* //////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={3} lg={3}>
                          <Form.Label className="form-label">Көше</Form.Label>
                          <Form.Control
                            style={
                              Boolean(errors.address_street?.message)
                                ? { borderColor: "#ED474A" }
                                : { borderColor: "#0E6BA8" }
                            }
                            className="firstname-input"
                            type="text"
                            placeholder={
                              userData &&
                              userData.address &&
                              userData.address.street
                            }
                            {...register("address_street", {
                              required: "Көше атын енгізіңіз",
                            })}
                          />
                          {Boolean(errors.address_street?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.address_street?.message}
                            </Form.Label>
                          ) : (
                            ""
                          )}
                        </Col>
                        {/* //////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={3} lg={3}>
                          <Form.Label>Үй</Form.Label>
                          <Form.Control
                            style={
                              Boolean(errors.address_home?.message)
                                ? { borderColor: "#ED474A" }
                                : { borderColor: "#0E6BA8" }
                            }
                            className="firstname-input"
                            placeholder={
                              userData &&
                              userData.address &&
                              userData.address.home
                            }
                            type="text"
                            {...register("address_home", {
                              required: "Үй нөмірін енгізіңіз",
                            })}
                          />
                          {Boolean(errors.address_home?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.address_home?.message}
                            </Form.Label>
                          ) : (
                            ""
                          )}
                        </Col>
                        {/* //////////////////////////////////////////// */}
                        <Col className="col-12">
                          <hr className="basic-hr" />
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                  <div className="align-items-end d-flex justify-content-start card-footer-btn">
                    <button
                      disabled={!isValid}
                      type="submit"
                      className="btn btn-primary d-block  submit-btn"
                    >
                      Мәліметтерді сақтау
                    </button>
                  </div>
                </Card>
              </Form>
            </Col>
            <Col className="col-12">
              <hr className="basic-hr" />
            </Col>
            {userData && userData.role === "user" && (
              <Col>
                <Tabs
                  defaultActiveKey="news"
                  className="mb-3"
                  style={{ borderRadius: "1px" }}
                  fill
                >
                  <Tab eventKey="news" title="Жаңалық панелі">
                    <Row>
                      <Col className="col-12">
                        <Card className="news-panel-card">
                          <Card.Body >
                            <Card.Title>Жаңалық панелі</Card.Title>
                            <Card.Text>Бұл панелде модератор мәртебесіне ие қолданушы сайт ішіндегі жаңалықтарды қосу, оқу, жаңарту, өшіру мүмкіндігін қолдана алады.</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={3} md={3} sm={6} xs={12}>

                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="profile" title="Profile"></Tab>
                </Tabs>
              </Col>
            )}
          </Row>
          <br />
        </Container>
      </section>
    </>
  );
};

export default Profile;
