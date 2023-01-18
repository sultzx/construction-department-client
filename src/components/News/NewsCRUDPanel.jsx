import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap"

import { selectIsAuth } from "../../redux/slices/auth.js";
import BreadLinker from "../BreadLinker/BreadLinker.jsx"

const NewsCRUDPanel = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);

    const [responseMessage, setResponseMessage] = React.useState("");

    return (<>
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
            <BreadLinker links={[
                {
                    url: '/main',
                    name: 'Басты бет'
                },
                {
                    url: '/profile',
                    name: 'Модератор профилі'
                },
                {
                    url: '/news-crud-panel',
                    name: 'Жаңалықтар панелі'
                },
            ]} />
        </Container>
        </section>
    </>)
}

export default NewsCRUDPanel