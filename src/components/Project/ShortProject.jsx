import React from "react";
import { Card, ButtonGroup } from "react-bootstrap";
import "../../styles/Newspaper.scss"
import { categories } from "../../categories.js";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import flag_icon from '../../images/flag-icon.png'

const ShortProject = ({ title, text, begin, end, category, coordinates, isLoaded, isShort }) => {

  const sortedCategories = []

  categories?.forEach((cat, i) => {
    if (cat.name === category?.name) {
      sortedCategories.push(cat)
    }
  })

  const [map, setMap] = React.useState(null)

  const containerStyle = {
    width: 'auto',
    height: '280px'
};

const onUnmount = React.useCallback(function callback(map) {
  setMap(null)
}, [])


  console.log(sortedCategories && sortedCategories)

  return (
    <>
      <Card className="newspaper-page-card" >
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <br />
          <Card.Subtitle style={{ color: 'gray' }}> Басталуы: {new Date(begin).toISOString().substring(0, 10)}</Card.Subtitle>
          <br />
          <Card.Subtitle style={{ color: 'gray' }}> Аяқталуы: {new Date(end).toISOString().substring(0, 10)}</Card.Subtitle>
          <br />
          <Card.Text>{text}</Card.Text>
          <hr />
          <img src={sortedCategories[0]?.url} alt="" />
          <h6>{category?.name}</h6>
          <hr />
          {!isShort && isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}

              center={coordinates}
              zoom={17}

              onUnmount={onUnmount}>
              <Marker key={'1'}
                icon={flag_icon}
                position={coordinates}>

              </Marker>
            </GoogleMap>
          ) : <></>}
          
        </Card.Body>
        {/* <div className="d-flex justify-content-end card-footer-btn">
          <ButtonGroup>
            <button className="btn btn-primary d-block  upload-btn ">
              Толығырақ
            </button>
          </ButtonGroup>
        </div> */}
      </Card>
    </>
  );
};

export default ShortProject;
