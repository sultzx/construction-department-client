import { Container, Alert, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadLinker from "../BreadLinker/BreadLinker.jsx";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

import "./style.scss";
import React from "react";
import { fetchAuthMe, selectIsAuth } from "../../redux/slices/auth.js";
import { fetchGetAllProjects } from "../../redux/slices/project.js";
import flag_icon from '../../images/flag-icon.png'
import { fetchCreateMonitoring, fetchGetAllMonitorings } from "../../redux/slices/monitoring.js";

const FullProject = ({ isLoaded }) => {

    const { id } = useParams();

    console.log(id)

    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);

    const { data } = useSelector((state) => state.auth);

    const { project } = useSelector((state) => state.project);
    const { monitoring } = useSelector((state) => state.monitoring);

    const [pickedDate, setPickedDate] = React.useState()

    const [responseMessage, setResponseMessage] = React.useState('');

    const sortedProject = []

    const isProjectLoading = project && project.status === "loading";

    React.useEffect(() => {
        dispatch(fetchGetAllProjects());
        dispatch(fetchGetAllMonitorings())
    }, []);

    project?.items?.forEach((item, i) => {
        if (item._id == id) {
            sortedProject.push(item)
        }
    })

    console.log('sortedProject[0]', sortedProject[0])

    ///////////////////////////////////

    const [activeMarker, setActiveMarker] = React.useState(null);

    const [map, setMap] = React.useState(null)

    const containerStyle = {
        width: 'auto',
        height: '280px'
    };

    const defaultCenter = {
        lat: sortedProject[0]?.coordinates?.lat,
        lng: sortedProject[0]?.coordinates?.lng
    };

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])



    const createMonitoring = async () => {
        let fetch = ''
        if (pickedDate && pickedDate) {
            fetch = await dispatch(fetchCreateMonitoring({
                project: sortedProject[0]?._id,
                deadline: pickedDate && pickedDate,
                demander: data?._id,
                submitter: sortedProject[0]?.owner?._id
            }))
            dispatch(fetchAuthMe());
            setResponseMessage(fetch?.payload?.message)
            window.location.reload()
        } else {
            alert('Уақытты таңлаңыз')
        }

    }

    console.log('data', data && data)

    var DateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    console.log(monitoring?.items)

    const sortedMonitoring = []

    monitoring?.items?.forEach((moni, i) => {
        if (moni?.project?._id == sortedProject[0]?._id) {
            sortedMonitoring.push(moni)
        }
    })

    console.log(sortedMonitoring && sortedMonitoring)

    return (<>
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
                            url: "/monitoring-crud-panel",
                            name: "Мониторинг панелі",
                        },
                        {
                            url: "/monitoring-crud-panel/" + id,
                            name: id,
                        },
                    ]}
                />
                <hr className="basic-hr" />
                <Row>
                    <Col>
                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={containerStyle}

                                center={defaultCenter}
                                zoom={17}
                                onLoad={(map) => setMap(map)}
                                onUnmount={onUnmount}>
                                <Marker key={'1'}
                                    icon={flag_icon}
                                    position={defaultCenter}
                                    onClick={() => {
                                        handleActiveMarker('1')
                                    }}>
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
                            </GoogleMap>
                        ) : <></>}
                    </Col>
                </Row>
                <hr className="basic-hr" />
                <Row>
                    <Col>
                        <h2>{sortedProject[0]?.title}</h2>
                    </Col>
                    <Col className="col-12">
                        <p style={{ margin: '0', color: '#606060' }}>Басталуы: {sortedProject[0]?.begin && new Date(sortedProject[0]?.begin).toLocaleDateString("kk-KZ", DateOptions)}</p>
                        <p style={{ margin: '0', color: '#606060' }}>Аяқталуы (шамамен): {sortedProject[0]?.end && new Date(sortedProject[0]?.end).toLocaleDateString("kk-KZ", DateOptions)}</p>
                    </Col>
                    <Col className="col-12">
                        <p style={{ margin: '12px 0', color: 'black' }}>Толығырақ: {sortedProject[0]?.text}</p>
                    </Col>
                </Row>
                <hr className="basic-hr" />
                <Row>
                    <Col className="col-12">
                        <Card style={{
                            border: '1px solid #5AA6D1',
                            borderRadius: '1px',
                            borderLeft: '6px solid #5AA6D1'
                        }}>
                            <Card.Body>
                                <p style={{
                                    margin: '0'
                                }}>Ағымдағы жоба бойынша мониторинг сұраныстарын жергілікті әкімшілік жіберетін болады.  </p>
                            </Card.Body>
                        </Card>
                    </Col>


                </Row>
                <hr className="basic-hr" />
                <Row>
                    {
                        monitoring?.items?.map((m, i) => (
                            m?.project?._id == id &&
                            <Col md={4} key={i} style={{margin: '12px 0'}}>
                                <Card style={{
                                    border: `1px solid ${m?.status == 'checking' ? 'orange' : m?.status == 'passed' ? 'green' : m?.status == 'unapproved' && '#900000'}`,
                                    borderRadius: '1px',
                                    borderLeft: `6px solid ${m?.status == 'checking' ? 'orange' : m?.status == 'passed' ? 'green' : m?.status == 'unapproved' && '#900000'}`
                                }}>
                                    <Card.Body>
                                        <p style={{ margin: '0' }}>Талап етуші: {m?.demander?.director?.lastname} {m?.demander?.director?.firstname}  {m?.demander?.director?.patronymic}</p>
                                        <p style={{ margin: '0' }}>Мекеме: {m?.demander?.name}</p>
                                        <hr />
                                        <p style={{ margin: '0' }}>Орындалу мерзімі: {m?.deadline && new Date(m?.deadline).toISOString().split('T')[0]}</p>
                                        <hr />
                                        <p style={{ margin: '0' }}>Тапсырушы: {m?.submitter?.director?.lastname} {m?.submitter?.director?.firstname}  {m?.submitter?.director?.patronymic}</p>
                                        <p style={{ margin: '0' }}>Мекеме: {m?.submitter?.name}</p>
                                        <hr />
                                        <span>Статусы: {m?.status == 'checking' ? 'Күтілуде' : m?.status == 'passed' ? 'Қабылданды' : m?.status == 'unapproved' && 'Өзгертуге жіберілді'}</span>
                                        <hr />
                                        <div className="text-end">
                                            {
                                                data?.category == 'contractor' && 
                                                <button  className={`btn btn-primary ${m?.status == 'checking' ? 'update' : m?.status == 'passed' ? 'create' : m?.status == 'unapproved' && 'delete'}-news-btn`} onClick={() => { window.location.assign(`http://localhost:3000/monitoring-crud-panel/${id}/monitoring/${m?._id}`) }}>
                                               { 
                                                    m?.status == 'checking' || m?.status == 'unapproved' ? 'Құжатты толтыру' : m?.status == 'passed' && 'Толығырақ'
                                                  }
                                                
                                            </button>
                                            }
                                            
                                            {
                                                data?.category == 'governance' && 
                                                <button  className={`btn btn-primary ${m?.status == 'checking' ? 'update' : m?.status == 'passed' ? 'create' : m?.status == 'unapproved' && 'delete'}-news-btn`} onClick={() => { window.location.assign(`http://localhost:3000/monitoring-crud-panel/${id}/monitoring/${m?._id}`)  }}>
                                                  { 
                                                    m?.status == 'checking' || m?.status == 'unapproved' ? 'Құжатты тексеру' : m?.status == 'passed' && 'Толығырақ'
                                                  }
                                                   
                                            </button>
                                            }
                                        </div>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                    {
                        sortedMonitoring && sortedMonitoring.length < 1 && <h6>Әзірге мониторинг актілері жоқ</h6>
                    }
                </Row>
                <hr className="basic-hr" />
                <Row>
                    {
                        data?.category == 'governance' && <>
                            <Col md={3} style={{ marginTop: '4px' }}>
                                <input style={{ borderColor: "#0E6BA8" }}
                                    className="form-control firstname-input"
                                    type="date"
                                    onChange={(event) => {
                                        setPickedDate(event.target.value)
                                    }} />
                            </Col>
                            <Col className="col-md-auto d-flex column" style={{ marginTop: '4px' }}>
                                <button disabled={!pickedDate} className="btn btn-primary create-news-btn flex-fill" onClick={() => { createMonitoring() }}>
                                    Жаңа мониторинг актісін құру
                                </button>
                            </Col>
                        </>
                    }
                </Row>
            </Container>
            <br />
        </section>
    </>)
}

export default FullProject