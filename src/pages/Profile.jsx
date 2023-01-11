import {
  Container,
  Row,
  Col,
  Button,
  Breadcrumb,
  Alert,
  Card,
  Form,
} from "react-bootstrap";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectIsAuth, fetchAuth } from "../redux/slices/auth";
import "../styles/index.scss";
import "../styles/Profile.scss";
import blueProfile from "../images/blue-profile.png";

const Profile = () => {
  const isAuth = useSelector(selectIsAuth);

  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    setErrorMessage(data.payload.message);

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
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
              <Card className="profile-page-card" style={{ height: "424px" }}>
                <Card.Body>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="circular--landscape">
                      <Card.Img
                        onClick={() => alert("asd")}
                        src={
                          userData && userData.avatarUrl
                            ? userData.avatarUrl
                            : blueProfile
                        }
                      />
                    </div>

                    <Card.Title
                      className="text-center"
                      style={{
                        color: "black",
                      }}
                    >
                      {userData && userData.lastname ? userData.lastname : ""}{" "}
                      {userData && userData.firstname
                        ? userData.firstname
                        : " "}{" "}
                    </Card.Title>
                  </div>
                </Card.Body>
                <div className="d-flex justify-content-center card-footer-btn">
                  <button className="btn btn-primary d-block  upload-btn">
                    Фото жүктеу
                  </button>
                </div>
              </Card>
            </Col>
            <Col lg={8} md={6} sm={6} xs={12}>
              <Card className="profile-page-card" style={{ height: "424px" }}>
                <Card.Body>
                <div className="d-flex flex-column justify-content-center align-items-center">
                        <Card.Text>sdasdasd</Card.Text> 
                </div>
                </Card.Body> 
                <div className="align-items-end d-flex justify-content-start card-footer-btn">
                    <button 
                      disabled={!isValid}
                      type="submit"
                      className="btn btn-primary d-block  upload-btn">
                      Мәліметтерді сақтау
                    </button>
                  </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Profile;
