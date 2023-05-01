import { Container, Row, Col, Button } from 'react-bootstrap'

import '../styles/index.scss'
import flag from '../images/flag.png'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { fetchGetAllNews } from '../redux/slices/news'
import { fetchGetAllProjects } from '../redux/slices/project'
import ShortProject from '../components/Project/ShortProject'
import ShortNews from '../components/News/ShortNews'

const Main = ({ isLoaded }) => {

    const dispatch = useDispatch()

    const project = useSelector(state => state.project)
    const newspaper = useSelector(state => state.news)

    React.useEffect(() => {

        dispatch(fetchGetAllNews())
        dispatch(fetchGetAllProjects())

    }, [])

    return (<>
        <section className='text-center main-page-section'>
            <img src={flag} className='main-page-flag-img' width='623px' height='491px' alt='flag' />
            <Row>
                <Col md={12} lg={12} sm={12} xs={12}>
                    <h1>Шет ауданының құрылыс бөлімі ММ</h1>
                </Col>
                <Col className='col-xxl-8 offset-xxl-2'>
                    <hr />
                </Col>
                <Col md={12} lg={12} sm={12} xs={12}>
                    <h3>Құрылыс бөлімі</h3>
                </Col>
            </Row>
        </section>
        <br />
        <Container>
            <h4>Соңғы жобалар</h4>
            <p>Жергілікті әкімшілік веб-cайты ішінде құрылып жатқан жобалардың тізімін көре аласыздар.</p>
            <Row>

                {project && project?.project?.items?.map((item, i) => i < 3 && (
                    <Col style={{ marginTop: '6px' }} key={i} md={4} sm={6} xs={12}>
                        <ShortProject title={item?.title} begin={item?.begin} end={item?.end} text={item?.text}
                            category={item?.category}
                            coordinates={item?.coordinates}
                            isLoaded={isLoaded}
                            isShort={true}
                        />
                    </Col>
                ))}

            </Row>
            <br />
            <Row>
                <Col md={10}></Col>
                <Col md={'2'} className='d-flex column justify-content-end '>
                    <Button className='btn btn-primary d-block upload-btn' href="http://localhost:3000/projects">Толығырақ</Button>
                </Col>
            </Row>
            <hr />
        </Container>

        <Container>
            <h4>Соңғы жаңалықтар</h4>
            <p>Жергілікті әкімшілік веб-cайты ішіндегі жаңалықтар тізімін көре аласыздар.</p>
            <Row>

            {newspaper && newspaper?.news?.items?.map((item, i) => i < 4 && (
            <Col style={{marginTop: '24px'}} key={i} lg={3} md={4} sm={6} xs={12}>
              <ShortNews title={item?.title} date={item?.date} text={item?.text} img={item?.imageUrl} />
            </Col>
          ))}

            </Row>
            <br />
            <Row>
                <Col md={10}></Col>
                <Col md={'2'} className='d-flex column justify-content-end '>
                    <Button className='btn btn-primary d-block upload-btn' href="http://localhost:3000/news">Толығырақ</Button>
                </Col>
            </Row>
            <hr />
            <br />
        </Container>
    </>)
}

export default Main