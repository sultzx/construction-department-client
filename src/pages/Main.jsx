import { Row, Col } from 'react-bootstrap'

import '../styles/index.scss'
import flag from '../images/flag.png'

const Main = () => {

    return (<>
    <section className='text-center main-page-section'>
        <img src={flag} className='main-page-flag-img' width='623px' height='491px' alt='flag' />
        <Row>
            <Col md={12} lg={12} sm={12} xs={12}>
                <h1>Қарағанды облысының әкімдігі</h1>
            </Col>
            <Col className='col-xxl-8 offset-xxl-2'>
                <hr />
            </Col>
            <Col md={12} lg={12} sm={12} xs={12}>
                <h3>Құрылыс бөлімі</h3>
            </Col>
        </Row>
    </section>
    </>)
}

export default Main