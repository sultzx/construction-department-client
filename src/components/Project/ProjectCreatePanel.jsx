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
import { GoogleMap, useJsApiLoader, Marker, InfoWindow,  DirectionsRenderer } from '@react-google-maps/api';

import { selectIsAuth, fetchAuthMe } from "../../redux/slices/auth.js";

import axios from "../../axios.js";
import BreadLinker from "../BreadLinker/BreadLinker.jsx";
import {Authcomplete} from "../Autocomplete/Autocomplete.jsx";

import flag_icon from '../../images/flag-icon.png'
import { fetchCreateProject } from "../../redux/slices/project.js";

const MODES = {
  MOVE: 0,
  SET_MARKER: 1
}

const ProjectCreatePanel = ({isLoaded}) => {

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [newsImageUrl, setNewsImageUrl] = React.useState("");

  const [directionResponse, SetDirectionResponse] = React.useState(null);

  const [distance, setDistance] = React.useState('')

  const [duration, setDuration] = React.useState('')

  const [mode, setMode ] = React.useState(MODES.MOVE)

  const [mark, setMark] = React.useState()

  const originRef = React.useRef()

  const destinationRef = React.useRef()

  const [activeMarker, setActiveMarker] = React.useState(null);

  const containerStyle = {
    width: 'auto',
    height: '366px'
  };

  const defaultCenter = {
    lat:  49.818159503121485,
    lng: 73.10471657253771
  };

  const [center, setCenter] = React.useState(defaultCenter);

  const [map, setMap] = React.useState(null)

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
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })

  }

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError)

    } else {
      alert('Кешіріңіз, бұл браузерде геолокация функциясы жоқ')
    }
  }


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const [title, setTitle] = React.useState()
 
  const [text, setText] = React.useState()

  const [beginDate, setBeginDate] = React.useState()

  const [endDate, setEndDate] = React.useState()

  const [category, setCategory] = React.useState({})

  const inputFileRef = React.useRef(null);


  const calculateRoute = async () => {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    const directionsService = new window.google.maps.DirectionsService()

    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING
    })

    SetDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  const clearRoute = () => {
    SetDirectionResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
    setMark('')
  }


  const onPlaceSelect = React.useCallback((coordinates) => {
    console.log(coordinates)
    setCenter(coordinates)
  }, [])


  const toggleMode = React.useCallback(() => {
    switch(mode) {
      case MODES.MOVE: 
        setMode(MODES.SET_MARKER)
      break
      case MODES.SET_MARKER:
        setMode(MODES.MOVE)
      break
      default: 
        setMode(MODES.MOVE)
    }
    
  }, [mode]) 

  console.log(mode)

  const onMark = React.useCallback( (coordinates) => {
    setMark(coordinates)
  }, [mark])

  const onClick = React.useCallback( (loc) => {
    if (mode === MODES.SET_MARKER) {
      const lat = loc.latLng.lat()
      const lng = loc.latLng.lng()
      console.log({lat, lng})
      onMark({lat, lng})
    }
    
  }, [mode])


  //////////////////////////////////////////


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


  const onSubmit = async () => {
    const data = await dispatch(
      fetchCreateProject({
        title: title && title,
        begin: beginDate && beginDate,
        end: endDate && endDate,
        text: text && text,
        category: category && category,
        coordinates: mark && mark
      }));

    dispatch(fetchAuthMe());
    
    setResponseMessage(data.payload.message);

    data.payload.message &&  alert(data.payload.message)

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

//////////////////////////////////////////////////////

const categories = [
  {
    id: 1, 
    name: 'Қоғамдық тамақтану',
    url: 'https://disk.2gis.com/rubricator/eat594ef1a575533c3c1b558ee032dad50c.svg'
  },
  {
    id: 2, 
    name: 'Медицина',
    url: 'https://disk.2gis.com/rubricator/med_center48abd827ed6f57786fdc240a6f18473b.svg'
  },
  {
    id: 3, 
    name: 'Білім орталары',
    url: 'https://disk.2gis.com/rubricator/educationa3f4ddcc8b0dd3f81cb21469a69adc86.svg'
  },
  {
    id: 4, 
    name: 'Ойын-сауық орталары',
    url: 'https://disk.2gis.com/rubricator/celebrationsab049f43989c4a4dea52c5f7efd36624.svg'
  },
  {
    id: 5, 
    name: 'Спорттық кешендер',
    url: 'https://disk.2gis.com/rubricator/sporta0db873f3998605b4da50486aa4140b7.svg'
  },
  {
    id: 6, 
    name: 'Азық-түлік дүкендері',
    url: 'https://disk.2gis.com/rubricator/groceryb92f2cf09392e989ec78e9026c3f8a1f.svg'
  },
  {
    id: 7, 
    name: 'Билік',
    url: 'https://disk.2gis.com/rubricator/government45dcc425ac778318b7d502a1e9907f79.svg'
  },
  {
    id: 8, 
    name: 'Тұрғын үйлер',
    url: 'https://disk.2gis.com/rubricator/roofe171c2053d83421f80ee2a057b81acf4.svg'
  },
  {
    id: 9, 
    name: 'Автоқызмет көрсету',
    url: 'https://disk.2gis.com/rubricator/carservicec2ccb8751947d0fd184aa60489a7935b.svg'
  },
  {
    id: 10, 
    name: 'Сұлулық салондары',
    url: 'https://disk.2gis.com/rubricator/hairdressersfbbf55482a7b22b2e32733525dfd5fb8.svg'
  },
  {
    id: 11, 
    name: 'Арнайы дүкендер',
    url: 'https://disk.2gis.com/rubricator/shopsdeb2822041d72b7052e3ab817030a7cb.svg'
  },

  {
    id: 12, 
    name: 'Діни орындар',
    url: 'https://disk.2gis.com/rubricator/religion9ee7657f273cf82864a94ab94eb1172a.svg'
  },
]


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
          
                <Card className="profile-page-card">
                  <Card.Body>
                    <div className="d-flex flex-column justify-content-center">
                      <Row>
                        <Col md={6}>
                          <Row style={{
                            marginTop: "12px"
                          }}>
                            <Col md={12}>
                              <Form.Label>Нысан</Form.Label>
                              <Form.Control
                                onChange={(event) => setTitle(event.target.value)}
                                style={
                                  !title
                                    ? { borderColor: "#ED474A" }
                                    : { borderColor: "#0E6BA8" }
                                }
                                className="firstname-input"
                                type="text"
                                
                              />
                              
                            </Col>
                            {/* ////////////////////////////////////////// */}
                            <Col
                     
                              md={6}
                      
                              style={{ marginTop: "12px" }}
                            >
                              <Form.Label>Жобаның басталу уақыты</Form.Label>
                              <input
                                style={{ borderColor: "#0E6BA8" }}
                                className="form-control firstname-input"
                                type="date"
                                defaultValue={beginDate}
                                onChange={(event) =>
                                  setBeginDate(event.target.value)
                                }
                              />
                            </Col>
                            <Col
      
                              md={6}
                 
                              style={{ marginTop: "12px" }}
                            >
                              <Form.Label>Аяқталу мерзімі</Form.Label>
                              <input
                                style={{ borderColor: "#0E6BA8" }}
                                className="form-control firstname-input"
                                type="date"
                                defaultValue={endDate}
                                onChange={(event) =>
                                  setEndDate(event.target.value)
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
                                onChange={event => setText(event.target.value)}
                                as="textarea"
                                rows={11}
                                style={
                                  !text
                                    ? { borderColor: "#ED474A" }
                                    : { borderColor: "#0E6BA8" }
                                }
                                className="firstname-input"
                                type="text"
                                
                              />
                              
                            </Col>
                          </Row>
                        </Col>
                        {/* //////////////////////////////////// */}

                        {/* ////////////////////////////////////////////// */}
                        <Col xs={12} sm={12} md={6} lg={6} >
                          <Row
                            style={{
                              paddingLeft: "12px",
                              paddingRight: "12px",
                              marginTop: "12px",
                            }}
                          >
                            <Col md={12}  style={{
                              padding: '0'
                            }}>
                              <Form.Label>Локациясы</Form.Label>
                              <Row>
                                <Col md={12}>
                                  <Authcomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/>
                                </Col>
                              </Row>
                              {isLoaded ? (
                                <GoogleMap
                                  mapContainerStyle={containerStyle}

                                  center={center}
                                  zoom={17}
                                  onLoad={(map) => setMap(map)}
                                  onUnmount={onUnmount} 
                                  onClick={onClick}
                                >

                                 <Marker key={'1'} 
                                    
                                    position={center ? center : mark} 
                                    onClick={() => {
                                      handleActiveMarker('1')}}> 
                                    {
                                      activeMarker === '1' && <InfoWindow onCloseClick={() => setActiveMarker(null)}> 
                                        <div>
                                          {
                                          'Сіз осы жердесіз'
                                          } 
                                      </div>
                                      </InfoWindow>
                                    }
                                    </Marker>
                                  { mode == '1' &&
                                    mark && mark && 
                                    <Marker key={'1'} 
                                  icon={flag_icon}
                                  position={mark} 
                                  onClick={() => {
                                    handleActiveMarker('1')}}> 
                                  {
                                    activeMarker === '1' && <InfoWindow onCloseClick={() => setActiveMarker(null)}> 
                                      <div>
                                        Координатасы: <hr />{mark.lat }, { mark.lng}
                     
                                    </div>
                                    </InfoWindow>
                                  }
                                  </Marker>
                                  }
                                  
                                  {directionResponse && <DirectionsRenderer directions={directionResponse}/>}
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
                         
                            <Col md={4} style={{
                              padding: '0',
                              margin: '0'
                            }} className="d-flex column">
                              <button
                              onClick={() => {
                                toggleMode()
                              }}
                              className="btn news-image-upload-btn flex-fill"
                            >
                              <div className="text-center">Режимді ауыстыру</div>
                            </button>
                            </Col>
                            <Col md={2} style={{
                              padding: '0',
                              margin: '0'
                            }} className="d-flex column">
                              <button
                              onClick={() => {
                            
                                clearRoute()
                              }}
                              className="btn news-image-upload-btn flex-fill"
                            >
                              <div className="text-center">Тазарту</div>
                            </button>
                            </Col>
                          </Row>
   
                    
                        </Col>
                        {/* //////////////////////////////////////////// */}
                        <Col className="col-12">
                          <hr className="basic-hr" />
                        </Col>
                        <Col
                              md={12}
                            >
                              <Form.Label>Категория</Form.Label>
                              
                              <Row>
                                { categories.map((cat) => (
                                  <Col md={2} key={cat.id} className="text-center" 
                                  
                                  style={{
                                    margin: '6px 0'
                                  }}
                                  
                                  onClick={() => {
                                    setCategory({
                                      id: cat.id,
                                      name: cat.name
                                    })
                                  }}>
                                    <div className={`category-card ${
                                      category && category.id == cat.id && 'focused'
                                    }`} style={{
                                    padding: '12px 0 8px 0'
                                  }}>
                                      <img src={cat.url} alt="" />
                                    <p style={{
                                      margin: '12px 0 6px 0',
                                      fontSize: '12px'
                                    }}>{cat.name}</p>
                                    </div>
                                    
                                  </Col>
                                ))
                                  
                                }
                              </Row>

                            </Col>
                      </Row>
                    </div>
                  </Card.Body>
                  <div className="align-items-end d-flex justify-content-start card-footer-btn">
                    <button
                      disabled={!title || !text}
                      onClick={() => {
                        onSubmit()
                      }}
                      className="btn btn-primary d-block  submit-btn" >
                      Мәліметтерді сақтау
                    </button>
                  </div>
                </Card>
             
            </Col>
          </Row>
        </Container>
        <br />
        <br />
        <br />
      </section>
    </>
  );
};

export default ProjectCreatePanel;

