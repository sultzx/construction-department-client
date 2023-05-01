import { Container, Row, Col, Alert, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../redux/slices/auth.js";

import "../styles/Newspaper.scss"
import News from "../components/News/ShortNews.jsx";

import React from "react";
import { fetchGetAllProjects } from "../redux/slices/project.js";
import ShortProject from "../components/Project/ShortProject.jsx";

const Projects = ({isLoaded}) => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch()

  const project = useSelector(state => state.project)

  React.useEffect(() => {
    dispatch(fetchGetAllProjects())
  }, [])

  console.log(project?.project?.items)

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
            Жобалар
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr className="basic-hr" />
        <Row>

          {project && project?.project?.items?.map((item, i) => (
            <Col style={{marginTop: '24px'}} key={i}  md={4} sm={6} xs={12}>
              <ShortProject title={item?.title} begin={item?.begin} end={item?.end} text={item?.text} 
              category={item?.category} 
              coordinates={item?.coordinates}
              isLoaded={isLoaded}
              />
            </Col>
          ))}

        </Row>
      </Container>
    </>
  );
};

export default Projects;
