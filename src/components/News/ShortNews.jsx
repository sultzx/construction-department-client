import React from "react";
import { Card, ButtonGroup } from "react-bootstrap";
import "../../styles/Newspaper.scss"

const ShortNews = ({ title, date,  text, img }) => {
  return (
    <>
      <Card className="newspaper-page-card" style={{
        height: '400px'
      }}>
      <Card.Img className="cover responsive-fluid img-fluid" variant="top" 
      style={{
              marginTop: '6px',
              border: '1px solid #4595C6',
              borderRadius: '1px',
              backgroundColor: 'white'
            }}  
       src={img}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <br />
          <Card.Subtitle style={{color: 'gray'}}>{new Date(date).toISOString().substring(0, 10)}</Card.Subtitle>
          <br />
          <Card.Text>{text}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ShortNews;
