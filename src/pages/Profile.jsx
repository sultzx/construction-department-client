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
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

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
import seal from '../images/прямая.png'
import {Authcomplete} from "../components/Autocomplete/Autocomplete.jsx";

import axios from "../axios.js";

const Profile = ({ isLoaded }) => {
  const isAuth = useSelector(selectIsAuth);

  const { data } = useSelector((state) => state.auth);

  const [phone, setPhone] = React.useState(data && data.phone && data.phone)

  const [center, setCenter] = React.useState();

  console.log('isLoaded', isLoaded)
  console.log(data && data)

  const dispatch = useDispatch();

  const inputFileRef = React.useRef(null);

  const inputSignatureRef = React.useRef(null)

  const inputSealRef = React.useRef(null)


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
      alert("Аватар көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };

  const handleSignature = async (event) => {
    try {
      let file = event.target.files[0]
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/signature", formData);
      console.log(data.url);
    } catch (error) {
      console.warn(error);
      alert("Азаматтық қолын көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };

  const handleSeal = async (event) => {
    try {
      let file = event.target.files[0]
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/seal", formData);
      console.log(data.url);
    } catch (error) {
      console.warn(error);
      alert("Компания мөрін көшіру кезінде қате шықты");
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
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {

    let fetch = ''

    switch (data && data.role) {
      case 'user':
        fetch = await dispatch(
          fetchUpdateIndividual({
            lastname: values.lastname,
            firstname: values.firstname,
            patronymic: values.patronymic,
            phone: phone && phone,
            coordinates: center && center,
          })
        );
        break;
      case 'company':
        fetch = await dispatch(
          fetchUpdateEntity({
            name: values.name,
            director: {
              lastname: values.lastname,
              firstname: values.firstname,
              patronymic: values.patronymic
            },
            phone: phone && phone,
            coordinates: center && center,
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

  const onPlaceSelect = React.useCallback((coordinates) => {
    console.log(coordinates)
    setCenter(coordinates)
  }, [])

console.log(center && center)

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
                            `http://localhost:4444${data && data.avatarUrl
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
                            defaultValue={data && data.director && data.director.lastname}
                            placeholder={data && data.director && data.director.lastname}
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
                            defaultValue={data && data.director && data.director.firstname}
                            placeholder={data && data.director && data.director.firstname}
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
                            defaultValue={data && data.director && data.director.patronymic}
                            placeholder={data && data.director && data.director.patronymic}
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
                        {
                          data && data.role == 'company' && <>
                            <Col className="col-12">
                              <hr className="basic-hr" />
                            </Col>

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
                                defaultValue={data && data.name && data.name}
                                placeholder={data && data.name && data.name}
                                {...register("name", {
                                  required: "Компания атауын енгізіңіз",
                                  minLength: {
                                    value: 2,
                                    message:
                                      "Компания атауы 2 және 60 символ арасында болуы керек",
                                  },
                                  maxLength: {
                                    value: 60,
                                    message:
                                      "Компания атауы 2 және 60 символ арасында болуы керек",
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
                          </>
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
                        <Col  md={12} >
                        <Form.Label>Мекенжай</Form.Label> 
                          <p>{data?.coordinates?.description}</p>
                          <Authcomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/>
                        </Col>

                        {/* //////////////////////////////////////////// */}
                        {
                          data && data.role == 'company' && <>
                            <Col className="col-12">
                              <hr className="basic-hr" />
                            </Col>
                            <Form.Label>Компания мөрі мен құжаттамаға жауапты азаматтың қолы</Form.Label>
                            <Col md={6} className="text-center">
                              <img src={`http://localhost:4444${data?.signature}`}
                                className=""
                                style={{
                                  padding: '12px',
                                  width: 'auto',
                                  height: '160px',
                                  border: '2px dashed #267DB5'
                                }} alt="asd" />
                              <button
                                style={{
                                  margin: '16px 0 0 0'
                                }}
                                type="button"
                                className="btn btn-primary d-block  submit-btn" onClick={() => {
                                  inputSignatureRef.current.click()
                                }}>Азаматтың қолы</button>
                            </Col>
                            <input type="file" ref={inputSignatureRef} hidden onChange={handleSignature} />
                            <Col md={6} className="text-center">
                              {
                                data?.seal ? <img src="" alt="seal" /> : <>
                                <button
                                type="reset"
                                style={{
                                  width: '166px',
                                  height: '166px',
                                  backgroundColor: 'transparent',
                                  color: 'blue',
                                  fontWeight: '300',
                                  fontSize: `${ 22 - (data && data.name && data.name.length / 2)}px`,
                                  border: '1px solid blue',
                                  borderRadius: '50%',
                                  backgroundImage: `url(${seal})`,
                                  backgroundSize: 'cover',
                                }}>{data && data?.category == 'contractor' ? 'ЖШС': 'ММ'} <br />{`${data?.name.replace(/ММ|, ЖШС/g, '')}`}
                                
                                <p style={{fontSize: '10px', margin: '0', marginLeft: '40px', width: '50%'}}>{data?.coordinates?.description.replace(/улица|, Қазақстан/g, '')}</p>
                                {/* <p style={{fontSize: '10px', margin: '0'}}>{data?.address?.street}, {data?.address?.home}</p> */}
                                </button>

                                    </>
                              }

                              <button
                                style={{
                                  margin: '16px 0 0 0'
                                }}
                                type="button"
                                onClick={() => {
                                  inputSealRef.current.click()
                                }}
                                className="btn btn-primary d-block  submit-btn">Компания мөрі</button>
                              <input type="file" ref={inputSealRef} hidden onChange={handleSeal} />
                            </Col>
                          </>
                        }
                        {/* <Col className="col-12">
                          <hr className="basic-hr" />
                        </Col> */}
                       
                      </Row>
                    </div>
                  </Card.Body>
                  <div className="align-items-end d-flex justify-content-start card-footer-btn">
                    <button
                      disabled={!isValid}
                      type="submit"
                      style={{
                        marginTop: '16px'
                      }}
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
               data?.category == 'contractor'  && <>
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
                
                
              </>
            }
            <Col lg={4} md={4} sm={6} xs={12}>
                  <Card className="services-panel-card">
                    <Card.Body>
                      <Card.Title>Мониторинг</Card.Title>
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
                        to="/monitoring-crud-panel"
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
          </Row>
          <br />
        </Container>
      </section>
    </>
  );
};

export default Profile;
