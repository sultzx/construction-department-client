import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";


import "./style.scss";
import React from "react";


const TinyProject = ({ id, i, title, begin, end, text, coordinates, response , isLoaded}) => {

  var DateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  return (
    <Col md={3}>
      <Card className={`tiny-news-card`}>
        <Card.Body className={`${i % 2 == 0 ? 'darked-card-body' : ''}`}>
          <Row>
            <Col className="col-12">
              <span style={{ fontSize: '20px', color: '#0A2674' }}>{i + 1}</span>
            </Col>
            <Col className="col-12">
              {title}
            </Col>
            <hr />

            <Col className="col-12" style={{margin: '0 0 8px 0'}}>
              Басталуы: {new Date(begin).toLocaleDateString("kk-KZ", DateOptions)}
            </Col>

            <Col className="col-12" style={{margin: '8px 0'}}>
              Аяқталуы: {new Date(end).toLocaleDateString("kk-KZ", DateOptions)}
            </Col>

            <hr />
            <Col className="col-12" style={{margin: '4px 0 12px 0'}}>
              {text}
            </Col>
            
            <Col className=" text-end d-flex justify-content-end align-items-center">
              <button
                className="btn btn-primary update-news-btn"
                onClick={() => {
                  window.location.assign(`http://localhost:3000/monitoring-crud-panel/${id}`)
                }}>
                Толығырақ
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TinyProject;
