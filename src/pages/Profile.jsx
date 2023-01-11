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
import "../styles/Profile.scss"

const Profile = () => {
  const isAuth = useSelector(selectIsAuth);

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
            <Col lg={4} md={4} sm={6} xs={12}>
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
            <Col lg={8} md={8} sm={6} xs={12}>
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
