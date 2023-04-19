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
import { fetchGetAllProjects } from "../../redux/slices/project.js";
import TinyProject from "./TinyProject.jsx";

const MonitoringCRUDPanel = () => {
  
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const {project} = useSelector((state) => state.project);

  const isProjectLoading = project && project.status === "loading";

  React.useEffect(() => {
    dispatch(fetchGetAllProjects());
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
                url: "/monitoring-crud-panel",
                name: "Мониторинг панелі",
              },
            ]}
          />
          <hr className="basic-hr" />
          <Row>
          <h3>{`Мониторинг панелі`}</h3>
            {!isProjectLoading && project &&
              project.items &&
              project.items.map((project, index) => (
                <TinyProject
                  key={index}
                  i={index}
                  id={project._id}
                  title={project.title}
                  begin={project.begin && new Date(project.begin).toISOString().split('T')[0]}
                  end={project.end && new Date(project.end).toISOString().split('T')[0]}
                  text={project.text}
                  response={handleGetResponse}
                  />
              ))}

          </Row>
        </Container>
      </section>
    </>
  );
};

export default MonitoringCRUDPanel;
