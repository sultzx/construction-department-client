import { Container, Row, Col, Alert, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../redux/slices/auth.js";
import "../styles/index.scss";

const Contact = () => {
  const isAuth = useSelector(selectIsAuth);

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
          <Col lg={4} md={4} sm={6} xs={12}></Col>
          <Col lg={8} md={8} sm={6} xs={12}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
