import { Container, Row, Col, Alert, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../redux/slices/auth.js";

import "../styles/Newspaper.scss"
import News from "../components/News/ShortNews.jsx";
import { fetchGetAllNews } from "../redux/slices/news.js";
import React from "react";

const Newspaper = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch()

  const newspaper = useSelector(state => state.news)

  React.useEffect(() => {
    dispatch(fetchGetAllNews())
  }, [])

console.log(newspaper && newspaper)
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
          
          {newspaper && newspaper?.news?.items?.map((item, i) => (
            <Col style={{marginTop: '24px'}} key={i} lg={3} md={4} sm={6} xs={12}>
              <News title={item?.title} date={item?.date} text={item?.text} img={item?.imageUrl} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Newspaper;
