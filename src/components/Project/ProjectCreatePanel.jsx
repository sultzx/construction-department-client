import React from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import { selectIsAuth, fetchAuthMe } from "../../redux/slices/auth.js";
import {
  fetchCreateNews,
  fetchGetAllNews,
} from "../../redux/slices/news.js";
import axios from "../../axios.js";
import BreadLinker from "../BreadLinker/BreadLinker.jsx";

const ProjectCreatePanel = () => {

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [newsImageUrl, setNewsImageUrl] = React.useState("");

  const [lat, setLat] = React.useState('')
  const [lng, setLng] = React.useState('')

  const [activeMarker, setActiveMarker] = React.useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const posError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state == 'denied') {
          alert('Браузеріңізден осы сайтқа геолокация функциясын пайдалануға рұқсат берілмеген')
        }
      })
    } else {
      alert('Сіздің геолокацияңызға қол жеткізу мүмкін емес')
    }
  }

  const showPosition = (position) => {
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)
  }

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError)

    } else {
      alert('Кешіріңіз, бұл браузерде геолокация функциясы жоқ')
    }
  }

  const containerStyle = {
    width: 'auto',
    height: '370px'
  };

  const center = {
    lat: lat ? lat : 49.818159503121485,
    lng: lng ? lng : 73.10471657253771
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    language: 'kk-KZ',
    libraries: ['places']
  })

  const [map, setMap] = React.useState(null)



  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  console.log('map', map && map)

  React.useEffect(() => {
    dispatch(fetchGetAllNews());
  }, [dispatch]);

  const [formatedDate, setDate] = React.useState('');

  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post(
        `/api/upload/newspaper/`,
        formData
      );
      setNewsImageUrl(data && data.url);
      console.log(data.url);
    } catch (error) {
      console.warn(error);
      alert("Uploading newspaper error");
    }
    dispatch(fetchAuthMe());
  };

  const [responseMessage, setResponseMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      text: '',
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(
      fetchCreateNews({
        title: values.title,
        date: formatedDate && formatedDate,
        text: values.text,
        imageUrl: newsImageUrl && `http://localhost:4444${newsImageUrl}`,
      }));

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
          <BreadLinker
            links={[
              {
                url: "/main",
                name: "Басты бет",
              },
              {
                url: "/profile",
                name: "Мердігер профилі",
              },
              {
                url: "/project-crud-panel",
                name: "Жобалар панелі",
              },
              {
                url: "/project-crud-panel/create",
                name: "Қосу",
              },
            ]}
          />
          <hr className="basic-hr" />
          <Row>
            <h3>{`Жаңа жоба қосу`}</h3>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Form onSubmit={handleSubmit(onSubmit)} method="post">
                <Card className="profile-page-card">
                  <Card.Body>
                    <div className="d-flex flex-column justify-content-center">
                      <Row>
                        <Col className="col-6">
                          <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                              <Form.Label>Нысан</Form.Label>
                              <Form.Control
                                disabled={!newsImageUrl}
                                style={
                                  Boolean(errors.title?.message)
                                    ? { borderColor: "#ED474A" }
                                    : { borderColor: "#0E6BA8" }
                                }
                                className="firstname-input"
                                type="text"
                                {...register("title", {
                                  required: "Тақырыбын енгізіңіз",
                                  minLength: {
                                    value: 3,
                                    message:
                                      "Тақырыбы 3 символдан кем болмауы керек",
                                  },
                                })}
                              />
                              {Boolean(errors.title?.message) ? (
                                <Form.Label style={{ color: "#EF393B" }}>
                                  {errors.title?.message}
                                </Form.Label>
                              ) : (
                                ""
                              )}
                            </Col>
                            {/* ////////////////////////////////////////// */}
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              style={{ marginTop: "12px" }}
                            >
                              <Form.Label>Уақыты</Form.Label>
                              <input
                                style={{ borderColor: "#0E6BA8" }}
                                className="form-control firstname-input"
                                type="date"
                                defaultValue={formatedDate}
                                onChange={(event) =>
                                  setDate(event.target.value)
                                }
                              />
                            </Col>
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              style={{ marginTop: "12px" }}
                            >
                              <Form.Label>Толығырақ</Form.Label>
                              <Form.Control
                                disabled={!newsImageUrl}
                                as="textarea"
                                rows={10}
                                style={
                                  Boolean(errors.text?.message)
                                    ? { borderColor: "#ED474A" }
                                    : { borderColor: "#0E6BA8" }
                                }
                                className="firstname-input"
                                type="text"
                                {...register("text", {
                                  required: "Тақырыбын енгізіңіз",
                                  minLength: {
                                    value: 3,
                                    message:
                                      "Тақырыбы 3 символдан кем болмауы керек",
                                  },
                                })}
                              />
                              {Boolean(errors.text?.message) ? (
                                <Form.Label style={{ color: "#EF393B" }}>
                                  {errors.text?.message}
                                </Form.Label>
                              ) : (
                                ""
                              )}
                            </Col>
                          </Row>
                        </Col>
                        {/* //////////////////////////////////// */}

                        {/* ////////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={6} lg={6} >

                          {/* <div className="text-center">
                            <div  
                                  style={{
                                    borderStyle: 'dashed',
                                    borderWidth: '2px',
                                    borderRadius: '1px',
                                    borderColor: '#58A4D0',
                                    padding: '22px'
                                  }}>

                              {newsImageUrl && (
                                <img
                                  hidden={!newsImageUrl}
                                  style={{ height: "320px" }}
                                  className="img-fluid"
                                  src={`http://localhost:4444${newsImageUrl}`}
                                  alt="qwd"
                                />
                              )}
                            </div>
                          </div> */}
                          <Row
                            style={{
                              paddingLeft: "12px",
                              paddingRight: "12px",
                              marginTop: "12px",
                            }}
                          >
                            <Col md={12} style={{
                              padding: '0'
                            }}>
                              <Form.Label>Локациясы</Form.Label>
                              {isLoaded ? (
                                <GoogleMap
                                  mapContainerStyle={containerStyle}
                                  center={center}
                                  zoom={17}
                                  onLoad={(map) => setMap(map)}
                                  onUnmount={onUnmount} 
                                  onClick={() => setActiveMarker(null)}
                                >
                                  <Marker key={'1'} draggable position={center} 
                                  onClick={() => handleActiveMarker('1')}> 
                                  {
                                    lat && lng && activeMarker === '1' && <InfoWindow onCloseClick={() => setActiveMarker(null)}> 
                                      <div>
                                        {
                                         'Сіз осы жердесіз'
                                        } 
                                    </div>
                                    </InfoWindow>
                                  }
                                  </Marker>
                                </GoogleMap>
                              ) : <></>}
                            </Col>

                          
                            <Col md={6} style={{
                              padding: '0',
                              margin: '0'
                            }} className="d-flex column">
                              <button
                              onClick={() => {
                                getPosition()
                              }}
                              className="btn news-image-upload-btn flex-fill"
                            >
                              <div className="text-center">Геолокацияны қосу</div>
                            </button>
                            </Col>
                         
                            
                          </Row>
                          <input
                            style={
                              Boolean(errors.imageUrl?.message)
                                ? { borderColor: "#ED474A" }
                                : { borderColor: "#0E6BA8" }
                            }
                            className="firstname-input"
                            type="file"
                            ref={inputFileRef}
                            onChange={handleChangeFile}
                            hidden
                          />
                          {Boolean(errors.imageUrl?.message) ? (
                            <Form.Label style={{ color: "#EF393B" }}>
                              {errors.imageUrl?.message}
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
                      disabled={!isValid || !newsImageUrl}
                      type="submit"
                      className="btn btn-primary d-block  submit-btn" >
                      Мәліметтерді сақтау
                    </button>
                  </div>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProjectCreatePanel;

