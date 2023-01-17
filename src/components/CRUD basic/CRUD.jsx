import { Col, Card, ButtonGroup, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const CRUD = ({ icon, title, link, style, btn}) => {
  return (
    <>
      <Card className={`profile-page-card news-${style}`}>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <img
            src={icon}
            style={{ width: "130px", height: "130px", padding: "14px" }}
          />
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <div className="d-flex justify-content-end card-footer-btn">
          <ButtonGroup>
            <Link style={{textDecoration: 'none'}} to={`${link}`}>
              <a className={`btn btn-primary d-block news-${style}-btn`} >{btn}</a>
            </Link>
          </ButtonGroup>
        </div>
      </Card>
    </>
  );
};

export default CRUD;
