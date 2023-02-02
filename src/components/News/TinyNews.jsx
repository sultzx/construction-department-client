import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchDeleteNews, fetchGetAllNews } from "../../redux/slices/news.js";

import "./style.scss";
import React from "react";

const TinyNews = ({ id, i, title, date, text, imageUrl, response}) => {

  const dispatch = useDispatch();


  const [formatedDate, setDate] = React.useState(new Date(date))

  var DateOptions = {  year: 'numeric', month: 'short', day: 'numeric' };

  const onClickRemove = async () => {
    
    if(window.confirm('Точно оширгин кеп тур ма?')) {
      let data = await dispatch(fetchDeleteNews(id))
      response(data && data.payload && data.payload.message)
    }
  };
  
  return (
    <Col className="col-12">
      <Card className={`tiny-news-card`}>
        <Card.Body className={`${i % 2 == 0 ? 'darked-card-body': ''}`}>
          <Row>
            <Col className="col-1 d-flex justify-content-start align-items-center">
              <span style={{fontSize: '20px', color: '#0A2674'}}>{i + 1}</span>
            </Col>
            <Col style={{height: '150px'}} className="text-center d-flex justify-content-start align-items-center">
              <img src={imageUrl} width="150px"  className="img-fluid" style={{margin: '-8px'}} alt="" />
            </Col>
            <Col className="col-1 d-flex justify-content-start align-items-center">
              {title}
            </Col>
            <Col className="text-center d-flex justify-content-center align-items-center">
              {formatedDate.toLocaleDateString("kk-KZ", DateOptions)}
            </Col>
            <Col className="text-center d-flex justify-content-center align-items-center">
              {text}
            </Col>
            <Col className=" text-end d-flex justify-content-end align-items-center">
              <Link to={`update/${id}`}>
                <button className="btn btn-primary update-news-btn">Жаңарту</button>
              </Link>

              <button
                className="btn btn-primary delete-news-btn"
                onClick={ onClickRemove
                }
              >
                Өшіру
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TinyNews;
