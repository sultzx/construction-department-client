import { Container, Alert, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadLinker from "../BreadLinker/BreadLinker.jsx";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

import seal from '../../images/прямая.png'
import "./style.scss";
import React from "react";
import { fetchAuthMe, selectIsAuth } from "../../redux/slices/auth.js";
import { fetchGetAllProjects } from "../../redux/slices/project.js";
import flag_icon from '../../images/flag-icon.png'
import { fetchCreateMonitoring, fetchGetAllMonitorings } from "../../redux/slices/monitoring.js";
import axios from '../../axios.js';

const FullMonitoring = ({ isLoaded }) => {

    const { id, m_id } = useParams();

    console.log(id)

    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);

    const { data } = useSelector((state) => state.auth);

    const { project } = useSelector((state) => state.project);

    const { monitoring } = useSelector((state) => state.monitoring);

    const [responseMessage, setResponseMessage] = React.useState('');

    const imagesRef = React.useRef(null)


    const sortedMonitoring = []

    React.useEffect(() => {
        dispatch(fetchGetAllMonitorings())
    }, []);

    monitoring?.items?.forEach((item, i) => {
        if (item._id == m_id) {
            sortedMonitoring.push(item)
        }
    })

    console.log('sortedMonitoring[0]', sortedMonitoring[0])

    ///////////////////////////////////

    const handleChooseImages = async (event) => {
        try {
            Array.from(event.target.files).forEach(async (fil, i) => {
                const formData = new FormData();
                formData.append("image", fil);
                const { data } = await axios.post(`/api/upload/monitoring/${m_id}`, formData);
                console.log(data.url);
            })

            await dispatch(fetchAuthMe());
            window.location.reload()
        } catch (error) {
            console.warn(error);
            alert("Мониторинг фото-есептерін көшіру кезінде қате шықты");
        }


    };

    ///////////////////////////////////////


    const createMonitoring = async () => {
        let fetch = ''
        if (true) {
            fetch = await dispatch(fetchCreateMonitoring({
                project: sortedMonitoring[0]?._id,
                // deadline: pickedDate && pickedDate,
                demander: data?._id,
                submitter: sortedMonitoring[0]?.owner?._id
            }))
            setResponseMessage(fetch?.payload?.message)
        } else {
            alert('Уақытты таңлаңыз')
        }
    }

    const setMonitoringStatus = async (status) => {
        try {
            await axios.patch(`/api/monitoring/${m_id}/set-status`, {
                status
            });
            window.location.assign(`http://localhost:3000/monitoring-crud-panel/${id}`)
        } catch (error) {
            alert('Құжатты тексеру кезінде қате шықты')
        }
    }

    console.log('data', data && data)

    var DateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

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
                            name: sortedMonitoring[0]?.project?.title,
                        },
                        {
                            url: "/monitoring-crud-panel/" + id + '/monitoring/' + m_id,
                            name: `Мониторинг актісі - ${m_id.substring(0, 5)}`,
                        },
                    ]}
                />

                <hr className="basic-hr" />
                <Row>
                    <Col>
                        <h2>{sortedMonitoring[0]?.project?.title}</h2>
                    </Col>
                    <Col className="col-12">
                        <p style={{ margin: '0', color: '#606060' }}>Басталуы: {sortedMonitoring[0]?.project?.begin && new Date(sortedMonitoring[0]?.project?.begin).toLocaleDateString("kk-KZ", DateOptions)}</p>
                        <p style={{ margin: '0', color: '#606060' }}>Аяқталуы (шамамен): {sortedMonitoring[0]?.project?.end && new Date(sortedMonitoring[0]?.project?.end).toLocaleDateString("kk-KZ", DateOptions)}</p>
                    </Col>
                    <Col className="col-12">
                        <p style={{ margin: '12px 0', color: 'black' }}>Толығырақ: {sortedMonitoring[0]?.project?.text}</p>
                    </Col>
                </Row>
                <hr className="basic-hr" style={{ margin: '6px 0 0 0' }} />
                <Row>

                    <Col>
                        <Card style={{ margin: '0', border: '1px solid #4E9CCA', borderRadius: '1px' }}>
                            <Card.Body style={{ background: '#4E9CCA' }}>
                                <br />
                                <Row>
                                    <Col></Col>
                                    <Col md={9} style={{ background: 'white', height: '1200px' }}>
                                        <Row className="d-flex row" style={{ height: '1200px' }}>
                                            <Col className="col-12" style={{ height: '260px' }}>
                                                <br />
                                                <br />
                                                <Row>
                                                    <Col md={4} style={{ paddingLeft: '80px' }} className="text-start">
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>Талап етуші мекеме: </p>
                                                        <p style={{ margin: '-14px 0 0 0', fontFamily: 'Times New Roman', fontWeight: '600', fontSize: '18px' }}>{sortedMonitoring[0]?.demander?.name}</p>
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}> </p>
                                                        <p style={{ margin: '-14px 0', fontFamily: 'Times New Roman', fontSize: '18px' }}>
                                                            Тексеруші:  {sortedMonitoring[0]?.demander?.director?.lastname} &nbsp;
                                                            {sortedMonitoring[0]?.demander?.director?.firstname.substring(0, 1)}. &nbsp;
                                                            {sortedMonitoring[0]?.demander?.director?.patronymic.substring(0, 1)} </p>
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}> </p>
                                                        <p style={{ margin: '-14px 0 0 0', fontFamily: 'Times New Roman', fontSize: '18px' }}>{sortedMonitoring[0]?.createdAt && new Date(sortedMonitoring[0]?.createdAt).toLocaleDateString("kk-KZ", DateOptions)}</p>
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '14px', textDecoration: 'overline' }}>
                                                            Құжаттың құрылған уақыты </p>
                                                    </Col>
                                                    <Col md={4} className="text-center d-flex column justify-content-center align-items-center">
                                                        <img style={{ paddingLeft: '40px' }} src="https://www.gov.kz/static/media/gerb_sm.aaf449a0.png" />
                                                    </Col>
                                                    <Col md={4} style={{ paddingRight: '40px' }} className="text-end">
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>Есеп беруші мекеме: </p>
                                                        <p style={{ margin: '-14px 0 0 0', fontFamily: 'Times New Roman', fontWeight: '600', fontSize: '18px' }}>{sortedMonitoring[0]?.submitter?.name}</p>
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}></p>
                                                        <p style={{ margin: '-14px 0', fontFamily: 'Times New Roman', fontSize: '18px' }}>
                                                            Жауапты:  {sortedMonitoring[0]?.submitter?.director?.lastname} &nbsp;
                                                            {sortedMonitoring[0]?.submitter?.director?.firstname.substring(0, 1)}. &nbsp;
                                                            {sortedMonitoring[0]?.submitter?.director?.patronymic.substring(0, 1)} </p>
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}> </p>
                                                        <p style={{ margin: '-14px 0 0 0', fontFamily: 'Times New Roman', fontSize: '18px' }}>{sortedMonitoring[0]?.updatedAt && new Date(sortedMonitoring[0]?.updatedAt).toLocaleDateString("kk-KZ", DateOptions)}</p>
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '14px', textDecoration: 'overline' }}>
                                                            Құжаттың жаңартылған уақыты </p>
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}> </p>
                                                        <p style={{ margin: '-14px 0 0 0', fontFamily: 'Times New Roman', fontSize: '18px' }}>
                                                            {sortedMonitoring[0]?.deadline && new Date(sortedMonitoring[0]?.deadline).toLocaleDateString("kk-KZ", DateOptions)}  </p>
                                                        <p style={{ fontFamily: 'Times New Roman', fontSize: '14px', textDecoration: 'overline' }}>
                                                            Тапсыру мерзімі</p>
                                                    </Col>
                                                    <Col className="col-12" style={{ padding: '12px 40px 12px 80px' }}>
                                                        <hr style={{ border: '2px solid #0E62A1' }} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-12 d-flex row align-items-start">
                                                <Col className="col-12" style={{ padding: '40px 40px 12px 80px' }}>
                                                    <h4 className="text-center" style={{ fontFamily: 'Times New Roman', fontWeight: '600' }}>Мониторинг актісі - {m_id.substring(0, 5)}</h4>
                                                    <br />
                                                    <p style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ағымдағы мониторинг актісі бойынша талап етуші жергілікті мекеме "{sortedMonitoring[0]?.demander?.name}" жәнеде
                                                        осы құжатты тексеруші {sortedMonitoring[0]?.demander?.director?.lastname} {sortedMonitoring[0]?.demander?.director?.firstname} {sortedMonitoring[0]?.demander?.director?.patronymic} мырзаға таңдалып отырған жобаның {sortedMonitoring[0]?.project?.coordinates?.lat}' - {sortedMonitoring[0]?.project?.coordinates?.lng}'
                                                        координаталық нүктесінде орналасқан {sortedMonitoring[0]?.project?.begin && new Date(sortedMonitoring[0]?.project?.begin).toLocaleDateString('kk-KZ', DateOptions)} күні басталған "{sortedMonitoring[0]?.project?.title}" құрылыс нысаны бойынша есеп беруші мекеме "{sortedMonitoring[0]?.submitter?.name}" және жауапты азамат(-ша) {sortedMonitoring[0]?.submitter?.director?.lastname}
                                                        &nbsp;{sortedMonitoring[0]?.submitter?.director?.firstname} {sortedMonitoring[0]?.submitter?.director?.patronymic} құрылыс барысында істелген фото-есептерді осы құжатқа түсірді.
                                                    </p>
                                                    <br />
                                                    <Row>
                                                        {
                                                            sortedMonitoring[0]?.images?.map((image, i) => (
                                                                <Col className="col-3" key={i} style={{ margin: '3px 0' }}>
                                                                    <img src={`http://localhost:4444${image}`}
                                                                        onClick={() => { window.location.assign(`http://localhost:4444${image}`) }}
                                                                        className="monitoring-img"
                                                                        style={{ height: '103px', width: '203px', border: '1px solid #0D60A0' }} alt="" />
                                                                </Col>
                                                            ))
                                                        }
                                                    </Row>
                                                </Col>
                                            </Col>
                                            <Col className="col-12 d-flex align-items-end">
                                                <Col className="col-12 text-start " style={{ padding: '42px 40px 80px 80px' }}>
                                                    <p style={{ fontFamily: 'Times New Roman', fontWeight: '400', fontSize: '18px' }}>
                                                        Құжатты толтырған: &nbsp;
                                                        {sortedMonitoring[0]?.submitter?.director?.lastname}&nbsp;
                                                        {sortedMonitoring[0]?.submitter?.director?.firstname.substring(0, 1)}. &nbsp;
                                                        {sortedMonitoring[0]?.submitter?.director?.patronymic.substring(0, 1)}&nbsp;
                                                        <img src={`http://localhost:4444${sortedMonitoring[0]?.submitter?.signature}`} alt="Құжатты толтырған азамат қолы" />&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <button
                                                            type="reset"
                                                            style={{
                                                                width: '166px',
                                                                height: '166px',
                                                                backgroundColor: 'transparent',
                                                                color: 'blue',
                                                                fontWeight: '300',
                                                                fontSize: `${22 - (sortedMonitoring[0]?.submitter?.name?.length / 2)}px`,
                                                                border: '1px solid blue',
                                                                borderRadius: '50%',
                                                                backgroundImage: `url(${seal})`,
                                                                backgroundSize: 'cover',
                                                            }}> ЖШС <br />{`${sortedMonitoring[0]?.submitter?.name?.replace(/ММ|ЖШС/g, '')}`}
                                                            <p style={{ fontSize: '10px', margin: '0', marginLeft: '40px', width: '50%' }}>{sortedMonitoring[0]?.submitter?.coordinates?.description.replace(/улица|, Қазақстан/g, '')}</p>
                                                        </button></p>
                                                </Col>
                                            </Col>
                                        </Row>

                                        <br />
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <br />
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <hr className="basic-hr" />
                <Row>
                    {
                        data?.category == 'contractor' && <>
                            <Col className="col-md-auto d-flex column" style={{ marginTop: '4px' }}>
                                <button className="btn btn-primary create-news-btn flex-fill" onClick={() => { imagesRef.current.click() }}>
                                    Құжатқа фото-есептерді қосу
                                </button>
                                <input type="file" hidden multiple ref={imagesRef} onChange={handleChooseImages} />
                            </Col>
                        </>
                    }
                    {
                        data?.category == 'governance' && <>

                            {
                                sortedMonitoring[0]?.status == 'passed' &&
                                <Col className="col-12 d-flex column" style={{ marginTop: '4px' }}>
                                   Уақыт:  {  sortedMonitoring[0]?.updatedAt && new Date(sortedMonitoring[0]?.updatedAt).toLocaleDateString('kk-KZ', DateOptions)}
                                </Col>

                            }
                            <Col className="col-md-auto d-flex column" style={{ marginTop: '4px' }}>

                                <button
                                    disabled={
                                        sortedMonitoring[0]?.status == 'passed'
                                    }
                                    className="btn btn-primary create-news-btn flex-fill" onClick={() => { setMonitoringStatus('passed') }}>
                                    {
                                        sortedMonitoring[0]?.status == 'passed' ? 'Құжат қабылданды' : sortedMonitoring[0]?.status == 'checking' ? 'Құжатты қабылдау' : sortedMonitoring[0]?.status == 'unapproved' && 'Құжатты қабылдау'
                                    }
                                </button>
                            </Col>

                            <Col className="col-md-auto d-flex column" style={{ marginTop: '4px' }}>
                                {
                                    sortedMonitoring[0]?.status == 'checking' ? 
                                    <button
                                        className="btn btn-primary delete-news-btn flex-fill"
                                        style={{
                                            margin: '0'
                                        }}
                                        onClick={() => { setMonitoringStatus('unapproved') }}>
                                        Құжатты жөндеуге жіберу
                                    </button> :
                                    
                                    sortedMonitoring[0]?.status == 'unapproved' &&
                                    <button
                                        className="btn btn-primary delete-news-btn flex-fill"
                                        style={{
                                            margin: '0'
                                        }}
                                        onClick={() => { setMonitoringStatus('unapproved') }}>
                                        Құжатты жөндеуге жіберу
                                    </button>
                                }
                            </Col>
                        </>
                    }
                </Row>
            </Container>
            <br />
        </section>
    </>)
}

export default FullMonitoring