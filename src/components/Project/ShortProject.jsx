import React from "react";
import { Card, ButtonGroup } from "react-bootstrap";
import "../../styles/Newspaper.scss"

const ShortProject = ({ title, text, img }) => {
  return (
    <>
      <Card className="newspaper-page-card" >
      <Card.Img className="cover responsive-fluid" variant="top" style={{padding: '12px', backgroundColor: 'white'}}  height='180rem' src={img}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
        <div className="d-flex justify-content-end card-footer-btn">
          <ButtonGroup>
            <button className="btn btn-primary d-block  upload-btn ">
              Толығырақ
            </button>
          </ButtonGroup>
        </div>
      </Card>
    </>
  );
};

export default ShortProject;
