import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

import { selectIsAuth } from "../../redux/slices/auth.js";
import BreadLinker from "../BreadLinker/BreadLinker.jsx";

const NewsCRUDPanel = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [responseMessage, setResponseMessage] = React.useState("");

  const columns = [
    {
      dataField: "no",
      text: "",
    },
    {
      dataField: "img",
      text: "Бейнесі",
    },
    {
      dataField: "title",
      text: "Тақырыбы",
    },
    {
      dataField: "date",
      text: "Уақыты",
    },
    {
      dataField: "text",
      text: "Толығырақ",
    },
    {
      dataField: "option",
      text: "Опция",
    },
  ];

  const products = [
    {
      no: 1,
      img: <img src="" alt="" />,
      title: 'Asdasd',
      date: '2500',
      text: 'asdasd asdads asdad',
      option: <button className="btn btn-outline-primary">click</button>

    },
    {
      no: 2,
      img: <img src="" alt="" />,
      title: 'Asdasd',
      date: '2500',
      text: 'asdasd asdads asdad',
      option: <button className="btn btn-outline-primary">click</button>
    },
    {
      no: 3,
      img: <img src="" alt="" />,
      title: 'Asdasd',
      date: '2500',
      text: 'asdasd asdads asdad sdcsd sdcsd sdcsd sdcsd sdcsd sdcsd',
      option: <button className="btn btn-outline-primary">click</button>
    },
    {
      no: 4,
      img: <img src="" alt="" />,
      title: 'Asdasd c',
      date: '2500',
      text: 'asdasd asdads asdad',
      option: <button className="btn btn-outline-primary">click</button>
    },    {
      no: 5,
      img: <img src="" alt="" />,
      title: 'Asdasd',
      date: '2500',
      text: 'asdasd asdads asdaddcsdcsc',
      option: <button className="btn btn-outline-primary">click</button>
    }
    
  ]

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
                name: "Модератор профилі",
              },
              {
                url: "/news-crud-panel",
                name: "Жаңалықтар панелі",
              },
            ]}
          />
          <hr className="basic-hr" />
          <Row>
            <Col lg={12}>
              <h3>Жаңалықтар панелі</h3>
              <BootstrapTable
                keyField="id"
                striped
                hover
                data={products}
                condensed
                columns={columns}
                noDataIndication='Жаңалықтар дерекқорда жоқ'
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NewsCRUDPanel;
