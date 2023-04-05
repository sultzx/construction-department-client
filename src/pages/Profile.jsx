import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Alert,
  Card,
  Form
} from "react-bootstrap";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectIsAuth, fetchUpdateMe, fetchAuthMe, fetchUpdateIndividual, fetchUpdateEntity } from "../redux/slices/auth";
import "../styles/index.scss";
import "../styles/Profile.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import blueProfile from "../images/blue-profile.png";
import BreadLinker from "../components/BreadLinker/BreadLinker.jsx";
import envelope from "../images/envelope.png";
import project_management from "../images/project-management.png";
import clipboard from "../images/clipboard.png";

import axios from "../axios.js";

const Profile = () => {
  const isAuth = useSelector(selectIsAuth);

  const {data} = useSelector((state) => state.auth);

  const [phone, setPhone] = React.useState(data && data.phone && data.phone)


  console.log(data && data)

  const dispatch = useDispatch();

  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      let file = event.target.files[0]
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/avatar", formData);
      console.log(data.url);
      // Array.from(event.target.files).forEach(async (fil, i)=> {
      //   const formData = new FormData();
      //   formData.append("image", fil);
      //   const { data } = await axios.post("/api/upload/avatar", formData);
      // console.log(data.url);
      // })
    
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
      lastname: data && data.lastname,
      firstname: data && data.firstname,
      patronymic: data && data.patronymic,
      address_region: data && data.address && data.address.region,
      address_city: data && data.address && data.address.city,
      address_street: data && data.address && data.address.street,
      address_home: data && data.address && data.address.home,
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {

    let fetch = ''

    switch(data && data.role) {
      case 'user':     
      fetch = await dispatch(
        fetchUpdateIndividual({
          lastname: values.lastname,
          firstname: values.firstname,
          patronymic: values.patronymic,
          phone: phone && phone,
          address: {
            region: values.address_region,
            city: values.address_city,
            street: values.address_street,
            home: values.address_home,
          },
        })
      );
      break;
      case 'company': 
      fetch = await dispatch(
        fetchUpdateEntity({
          name: values.name,
          phone: phone && phone,
          address: {
            region: values.address_region,
            city: values.address_city,
            street: values.address_street,
            home: values.address_home,
          },
        })
      );
      break;
    }
   


    dispatch(fetchAuthMe());

    setResponseMessage(fetch.payload.message);

    if ("token" in fetch.payload) {
      window.localStorage.setItem("token", fetch.payload.token);
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
          <BreadLinker
            links={[
              {
                url: "/main",
                name: "Басты бет",
              },
              {
                url: "/profile",
                name: "Жеке профиль",
              },
            ]}
          />
          <hr className="basic-hr" />
          <Row>
            <Col lg={4} md={6} sm={6} xs={12}>
              <Card
                className={`profile-page-card 
              ${data && data.role === "user" && "for-user"} 
              ${data && data.role === "moderator" && "for-moderator"}  
              ${data && data.role === "admin" && "for-admin"}
              `}
              >
                <Card.Body>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="circular--landscape">
                      <Card.Img
                        onClick={() =>
                          document.onload(
                            `http://localhost:4444${
                              data && data.avatarUrl
                            }`
                          )
                        }
                        src={
                          data && data.avatarUrl
                            ? `http://localhost:4444${data.avatarUrl}`
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
                      {data && data.lastname ? data.lastname : ""}{" "}
                      {data && data.firstname
                        ? data.firstname
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
                      className="btn btn-primary d-block upload-btn"
                    >
                      Жүктеу
                    </button>
                  </ButtonGroup>

                  <input
                    type="file"
                    ref={inputFileRef}
                    multiple
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
                        {
                          data && data.role == 'user' && <>
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
                            placeholder={data && data.lastname}
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
                            placeholder={data && data.firstname}
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
                            placeholder={data && data.patronymic}
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
                          
                          </>
                        }
                        
                        {
                          data && data.role == 'company' && 
                          <Col xs={12} sm={12} md={4} lg={4}>
                          <Form.Label>Компания атауы</Form.Label>
                          <Form.Control
                            style={
                              Boolean(errors.name?.message)
                                ? { borderColor: "#ED474A" }
                                : { borderColor: "#0E6BA8" }
                            }
                            className="firstname-input"
                            type="text"
                            placeholder={data && data.name}
                            {...register("name", {
                              required: "Компания атауын енгізіңіз",
                              minLength: {
                                value: 2,
                                message:
                                  "Компания атауы 2 және 30 символ арасында болуы керек",
                              },
                              maxLength: {
                                value: 30,
                                message:
                                  "Компания атауы 2 және 30 символ арасында болуы керек",
                              },
                            })}
                          />
                          {Boolean(errors.name?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.name?.message}
                            </Form.Label> 
                          ) : (
                            ""
                          )}
                        </Col>
                        }

                        {/* //////////////////////////////////////////// */}
                        <Col className="col-12">
                          <hr className="basic-hr" />
                        </Col>
                      </Row>
                      <Row>
                        {/* //////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={4} lg={4}>
                          <Form.Label>Телефон</Form.Label>
                      <PhoneInput
   
                        className="form-control phone"
                        defaultCountry="KZ"
                        value={data && data.phone ? data.phone : phone}
                        onChange={setPhone}
                      />
                  
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
                              data &&
                              data.address &&
                              data.address.region
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
                              data &&
                              data.address &&
                              data.address.city
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
                              data &&
                              data.address &&
                              data.address.street
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
                              data &&
                              data.address &&
                              data.address.home
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
            {data && data.role === "admin" && (
              <>
                <Col lg={4} md={4} sm={6} xs={12}>
                  <Card className="news-panel-card">
                    <Card.Body>
                      <Card.Title>Жаңалықтар</Card.Title>
                      <div className="text-center">
                        <Card.Img
                          style={{
                            width: "90px",
                            height: "90px",
                            marginTop: "12px",
                            marginBottom: "12px",
                          }}
                          src={envelope}
                        />
                      </div>
                      <Card.Text>
                        Бұл панелде модератор мәртебесіне ие қолданушы сайт
                        ішіндегі жаңалықтарды қосу, оқу, жаңарту, өшіру
                        мүмкіндігін қолдана алады.
                      </Card.Text>
                      <Link
                        to="/news-crud-panel"
                        style={{ textDecoration: "none" }}
                      >
                        <button className="btn btn-primary d-block link-to-news-crud-btn">
                          Панелге көшу
                        </button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4} md={4} sm={6} xs={12}>
                  <Card className="services-panel-card">
                    <Card.Body>
                      <Card.Title>Сервистер</Card.Title>
                      <div className="text-center">
                        <Card.Img
                          style={{
                            width: "90px",
                            height: "90px",
                            marginTop: "12px",
                            marginBottom: "12px",
                          }}
                          src={clipboard}
                        />
                      </div>
                      <Card.Text>
                        Бұл панелде модератор мәртебесіне ие қолданушы сайт
                        ішіндегі жаңалықтарды қосу, оқу, жаңарту, өшіру
                        мүмкіндігін қолдана алады.
                      </Card.Text>
                      <Link
                        to="/news-crud-panel"
                        style={{ textDecoration: "none" }}
                      >
                        <button className="btn btn-primary d-block link-to-news-crud-btn">
                          Панелге көшу
                        </button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4} md={4} sm={6} xs={12}>
                  <Card className="services-panel-card">
                    <Card.Body>
                      <Card.Title>Жобалар</Card.Title>
                      <div className="text-center">
                        <Card.Img
                          style={{
                            width: "90px",
                            height: "90px",
                            marginTop: "12px",
                            marginBottom: "12px",
                          }}
                          src={project_management}
                        />
                      </div>
                      <Card.Text>
                        Бұл панелде модератор мәртебесіне ие қолданушы сайт
                        ішіндегі жаңалықтарды қосу, оқу, жаңарту, өшіру
                        мүмкіндігін қолдана алады.
                      </Card.Text>
                      <Link
                        to="/news-crud-panel"
                        style={{ textDecoration: "none" }}
                      >
                        <button className="btn btn-primary d-block link-to-news-crud-btn">
                          Панелге көшу
                        </button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-12">
                  <hr className="basic-panels-hr" />
                </Col>
              </>
            )}
            {
              data && data.category == 'contractor' && <>
              <Col lg={4} md={4} sm={6} xs={12}>
                  <Card className="services-panel-card">
                    <Card.Body>
                      <Card.Title>Жобалар</Card.Title>
                      <div className="text-center">
                        <Card.Img
                          style={{
                            width: "90px",
                            height: "90px",
                            marginTop: "12px",
                            marginBottom: "12px",
                          }}
                          src={project_management}
                        />
                      </div>
                      <Card.Text>
                        Бұл панелде мердігерлік қызмет көрсетуші компания жаңа жобаларды құрып, өңдей немесе өшіре алады
                      </Card.Text>
                      <Link
                        to="/project-crud-panel"
                        style={{ textDecoration: "none" }}
                      >
                        <button className="btn btn-primary d-block link-to-news-crud-btn">
                          Панелге көшу
                        </button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-12">
                  <hr className="basic-panels-hr" />
                </Col>
              </>
            }
          </Row>
          <br />
        </Container>
      </section>
    </>
  );
};

export default Profile;
