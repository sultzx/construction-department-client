import React from "react";
import { Container, Row, Col, Card, ButtonGroup } from "react-bootstrap";

const News = ({ title, text, img }) => {
  return (
    <>
      <Card className="profile-page-card">
        <Card.Body>
          <Card.Img src={img}/>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
        <div className="d-flex justify-content-end card-footer-btn">
          <ButtonGroup>
            <button className="btn btn-primary d-block  upload-btn">
              Толығырақ
            </button>
          </ButtonGroup>
        </div>
      </Card>
    </>
  );
};

export default News;
