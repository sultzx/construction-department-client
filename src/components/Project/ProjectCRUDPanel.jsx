import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import updateNews from "../../svg/update-news.jsx";

import { fetchDeleteNews, fetchGetAllNews } from "../../redux/slices/news.js";

import { selectIsAuth } from "../../redux/slices/auth.js";

import BreadLinker from "../BreadLinker/BreadLinker.jsx";
import "./style.scss";
import TinyNews from "./TinyProject.jsx";

const ProjectCRUDPanel = () => {
  
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const {news} = useSelector((state) => state.news);

  const isNewsLoading = news && news.status === "loading";

  React.useEffect(() => {
    dispatch(fetchGetAllNews());
  }, []);

  const [responseMessage, setResponseMessage] = React.useState('');

  const handleGetResponse = (response) => {
    setResponseMessage(response)
  }

  return (
    <>
      <section>
        {!isAuth ? (
          <Alert
            variant={"warning"}
            style={{ borderRadius: "1px", borderColor: "yellow" }}
          >
            {
              <div className="text-center" style={{ margin: "-12px" }}>
                <span>
                  Жүйедегі толық ақпараттарға қол жеткізу үшін тіркеліңіз немесе
                  кіріңіз
                </span>
              </div>
            }
          </Alert>
        ) : (
          <Alert
            variant={responseMessage ? "success" : "primary"}
            style={{ borderRadius: "1px" }}
          >
            {
              <div className="text-center" style={{ margin: "-12px" }}>
                {responseMessage && <span>{responseMessage}</span>}
              </div>
            }
          </Alert>
        )}
        <Container>
          <BreadLinker
            links={[
              {
                url: "/main",
                name: "Басты бет",
              },
              {
                url: "/profile",
                name: "Мердігер профилі",
              },
              {
                url: "/project-crud-panel",
                name: "Жобалар панелі",
              },
            ]}
          />
          <hr className="basic-hr" />
          <Row>
          <h3>{`Жобалар панелі`}</h3>
            {!isNewsLoading && news &&
              news.items &&
              news.items.map((news, index) => (
                <TinyNews
                  key={index}
                  i={index}
                  id={news._id}
                  title={news.title}
                  date={news.date && new Date(news.date).toISOString().split('T')[0]}
                  text={news.text}
                  imageUrl={news.imageUrl}
                  response={handleGetResponse}
                  />
              ))}
            <Col lg={12} style={{marginTop: '12px', marginBottom: '12px'}}>
              <Link to={`create`}>
                <button className="btn btn-primary create-news-btn">
                  Жаңа жоба қосу
                </button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProjectCRUDPanel;
