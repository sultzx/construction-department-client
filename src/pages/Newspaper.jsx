import { Container, Row, Col, Alert, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../redux/slices/auth.js";

import "../styles/Newspaper.scss"
import News from "../components/News/ShortNews.jsx";

const Newspaper = () => {
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
            Жаңалықтар
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr className="basic-hr" />
        <Row>
          {[1, 2, 3, 4, 5].map((item, i) => (
            <Col style={{marginTop: '24px'}} key={i} lg={3} md={4} sm={6} xs={12}>
              <News title={item + " Sultanscreed"} text={"Lorem Ipsum"} img={"data:image/jpeg;base64,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"} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Newspaper;
