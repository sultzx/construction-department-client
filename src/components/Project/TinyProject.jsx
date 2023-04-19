import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchDeleteNews } from "../../redux/slices/news.js";


import "./style.scss";
import React from "react";
import { fetchDeleteProject } from "../../redux/slices/project.js";


const TinyProject = ({ id, i, title, begin, end, text, coordinates, response , isLoaded}) => {

  const dispatch = useDispatch();

  const [formatedDate, setDate] = React.useState(new Date(begin))

  var DateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  const onClickRemove = async () => {

    if (window.confirm('Точно оширгин кеп тур ма?')) {
      let data = await dispatch(fetchDeleteProject(id))
      response(data && data.payload && data.payload.message)
    }
  };

console.log(isLoaded)

  return (
    <Col className="col-12">
      <Card className={`tiny-news-card`}>
        <Card.Body className={`${i % 2 == 0 ? 'darked-card-body' : ''}`}>
          <Row>
            <Col className="col-1 d-flex justify-content-start align-items-center">
              <span style={{ fontSize: '20px', color: '#0A2674' }}>{i + 1}</span>
            </Col>

            <Col className="col-1 d-flex justify-content-start align-items-center">
              {title}
            </Col>
            <Col className="text-center d-flex justify-content-center align-items-center">
              {new Date(begin).toLocaleDateString("kk-KZ", DateOptions)}
            </Col>
            <Col className="text-center d-flex justify-content-center align-items-center">
              {new Date(end).toLocaleDateString("kk-KZ", DateOptions)}
            </Col>
            <Col className="text-center d-flex justify-content-center align-items-center">
              {text}
            </Col>
            <Col className=" text-end d-flex justify-content-end align-items-center">
              <button
                className="btn btn-primary delete-news-btn"
                onClick={onClickRemove}>
                Өшіру
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TinyProject;
