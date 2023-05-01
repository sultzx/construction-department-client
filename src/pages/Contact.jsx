import { Container, Row, Col, Alert, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../redux/slices/auth.js";
import "../styles/index.scss";
import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import flag_icon from '../images/flag-icon.png'

const Contact = ({isLoaded}) => {

  const isAuth = useSelector(selectIsAuth);

  const [map, setMap] = React.useState(null)

  const {data} = useSelector(state => state.auth)

  const containerStyle = {
    width: 'auto',
    height: '400px'
};

const onUnmount = React.useCallback(function callback(map) {
  setMap(null)
}, [])

console.log(data && data)
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
            Бізбен байланыс
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr className="basic-hr" />
        <Row>
          <Col  md={6} className="d-flex row align-items-top justify-content-start">
            <h5>Шет ауданының құрылыс бөлімі ММ</h5>
            <p>Телефон: {data?.phone}</p>
            <p>Пошта: {data?.email}</p>
            <p>Директор: {data?.director?.lastname} {data?.director?.firstname} {data?.director?.patronymic}</p>
            <p>Мекенжай: {data?.coordinates?.description}</p>
          </Col>
          <Col md={6} style={{
            border: '1px solid #1772AD',
            borderRadius: '1px'
          }}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}

              center={data?.coordinates}
              zoom={17}

              onUnmount={onUnmount}>
              <Marker key={'1'}
                icon={flag_icon}
                position={data?.coordinates}
                >

              </Marker>
            </GoogleMap>
          ) : <></>}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
