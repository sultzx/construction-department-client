import { Container, Row, Col, Alert, Breadcrumb, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../redux/slices/auth.js";

import "../styles/Newspaper.scss"
import News from "../components/News/ShortNews.jsx";
import React from "react";
import { fetchCreateContest, fetchGetAllContests, fetchSetContest } from "../redux/slices/contest.js";

const Contest = () => {

    const isAuth = useSelector(selectIsAuth);

    const dispatch = useDispatch()

    const { data } = useSelector(state => state.auth)

    const { contest } = useSelector(state => state.contest)

    const [title, setTitle] = React.useState()

    const [text, setText] = React.useState()

    const [deadline, setDeadline] = React.useState()

    React.useEffect(() => {
        dispatch(fetchGetAllContests())
    }, [])


    const create = () => {
        if (title && text && deadline) {
            dispatch(fetchCreateContest({
                title: title,
                text: text,
                deadline: deadline
            }))
        } else {
            alert('Толық енгізіңіз')
        }

    }

    const set = (id) => {
        dispatch(fetchSetContest({
            id: id,
            winner: data?._id
        }))
    }

    console.log(contest?.items)

    return (
        <>
            <Alert
                variant={!isAuth ? "warning" : "primary"}
                style={
                    !isAuth
                        ? { borderRadius: "1px", borderColor: "yellow" }
                        : { borderRadius: "1px" }
                }
            >
                {
                    <div className="text-center" style={{ margin: "-12px" }}>
                        {!isAuth && (
                            <span>
                                Жүйедегі толық ақпараттарға қол жеткізу үшін тіркеліңіз немесе
                                кіріңіз
                            </span>
                        )}
                    </div>
                }
            </Alert>
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
                        Конкурс
                    </Breadcrumb.Item>
                </Breadcrumb>
                <hr className="basic-hr" />
                {
                    data?.isAdmin === 'true' && <>
                        <Row>

                            <Col md={4}>
                                <label>Конкурс атауы</label>
                                <input className="form-control firstname-input"
                                    onChange={event => setTitle(event.target.value)}
                                    type="text" />
                            </Col>
                            <Col md={4}>
                                <label>Толығырақ</label>
                                <input className="form-control firstname-input"
                                    onChange={event => setText(event.target.value)}
                                    type="text" />
                            </Col>
                            <Col md={4}>
                                <label>Мерзімі</label>
                                <input className="form-control firstname-input"
                                    onChange={event => setDeadline(event.target.value)}
                                    type="date" />
                            </Col>
                            <Col md={12}>
                                <br />
                                <Row>
                                    <Col md={10}>

                                    </Col>
                                    <Col md={2} className="d-flex column justify-content-end">
                                        <Button className="btn btn-primary d-block upload-btn" onClick={create}>Конкурс құру</Button>
                                    </Col>
                                </Row>
                            </Col>



                            {/* {newspaper && newspaper?.news?.items?.map((item, i) => (
                        <Col style={{ marginTop: '24px' }} key={i} lg={3} md={4} sm={6} xs={12}>
                            <News title={item?.title} date={item?.date} text={item?.text} img={item?.imageUrl} />
                        </Col>
                    ))} */}
                        </Row>
                        <hr />
                    </>
                }


                <Row>
                    {
                        contest?.items?.map((cont, i) => (
                            <Col md={12} key={i}>
                                <Card className="newspaper-page-card" >
                                    <Card.Body style={{
                                        height: '200px'
                                    }}>
                                        <Row>
                                            <Col md={6} className="text-start">
                                                <Card.Title>{cont?.title}</Card.Title>
                                                <br />
                                                <Card.Subtitle style={{ color: 'gray' }}>{new Date(cont?.deadline).toISOString().substring(0, 10)}</Card.Subtitle>
                                                <br />
                                                <Card.Text>{cont?.text}</Card.Text>
                                            </Col>
                                            <Col md={6}>
                                                <Card.Title>{cont?.winner?.name}</Card.Title>
                                                <br />
                                                <Card.Subtitle style={{ color: 'gray' }}>
                                                    {cont?.winner?.director?.lastname} {cont?.winner?.director?.firstname} {cont?.winner?.director?.patronymic}
                                                </Card.Subtitle>
                                                <br />
                                                <Card.Text>{cont?.winner?.email}</Card.Text>

                                                <Card.Text>{cont?.winner?.phone}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {
                                                data?.category == 'contractor' && <>
                                                    <Col md={10}></Col>
                                                    <Col md={2} className="d-flex column justify-content-end">
                                                        <Button className="btn btn-primary d-block upload-btn" onClick={() => set(cont?._id)}>Қабылдау</Button>
                                                    </Col>
                                                </>
                                            }

                                        </Row>
                                    </Card.Body>
                                </Card>
                                <br />
                            </Col>
                        ))
                    }


                </Row>
            </Container>
        </>
    );
};

export default Contest;
