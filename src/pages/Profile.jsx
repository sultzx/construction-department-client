import {
  Container,
  Row,
  Col,
  Button,
  Breadcrumb,
  Alert,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuth } from "../redux/slices/auth";
import "../styles/index.scss";
import "../styles/Profile.scss";
import blueProfile from "../images/blue-profile.png";

const Profile = () => {
  const isAuth = useSelector(selectIsAuth);

  const userData = useSelector((state) => state.auth.data);

  return (
    <>
      <section>
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
              Жеке профиль
            </Breadcrumb.Item>
          </Breadcrumb>
          <hr className="basic-hr" />
          <Row>
            <Col lg={4} md={6} sm={6} xs={12}>
              <Card className="profile-page-card shadow">
                <Card.Body 
                  style={{height: '460px'}}
                  className=" d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex flex-column justify-content-center align-items-center justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center justify-content-xxl-center align-items-xxl-center ">
                  <div className="circular--landscape">
                  <Card.Img
                    src={
                      userData && userData.avatarUrl
                        ? userData.avatarUrl
                        : blueProfile
                    }
                  />
                  </div>
                  
                  <Card.Title className="text-center" style={{
                    color: '#0E6BA8'
                  }}>
                    {userData && userData.lastname ? userData.lastname : ""} {" "}
                    {userData && userData.firstname ? userData.firstname : " "} {" "} <br />
                    {userData && userData.patronymic ? userData.patronymic : " "}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8} md={6} sm={6} xs={12}>
              <Card className="profile-page-card">
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Profile;
