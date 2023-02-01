import React from "react";
import { Container, Row, Col, Button, Alert, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { selectIsAuth } from "../../redux/slices/auth.js";
import { fetchCreateNews, fetchUpdateNews, fetchGetOneNews, fetchGetAllNews } from "../../redux/slices/news.js";

import BreadLinker from "../BreadLinker/BreadLinker.jsx";

const NewsCUPanel = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const {one} = useSelector((state) => state.news);

  React.useEffect(() => {
      dispatch(fetchGetOneNews(id))
  }, [])

  one && console.log(one.items && one.items.data, 'oneone')

  const [responseMessage, setResponseMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      // lastname: userData && userData.lastname,
      // firstname: userData && userData.firstname,
      // patronymic: userData && userData.patronymic,
      // phone: userData && userData.phone,
      // address_region: userData && userData.address && userData.address.region,
      // address_city: userData && userData.address && userData.address.city,
      // address_street: userData && userData.address && userData.address.street,
      // address_home: userData && userData.address && userData.address.home,
    },
    mode: "onChange"
  });

  const onSubmit = async (values) => {
    // const data = await dispatch(
    //   fetchUpdateMe({
    //     lastname: values.lastname,
    //     firstname: values.firstname,
    //     patronymic: values.patronymic,
    //     phone: values.phone,
    //     address: {
    //       region: values.address_region,
    //       city: values.address_city,
    //       street: values.address_street,
    //       home: values.address_home,
    //     },
    //   })
    // );

    // dispatch(fetchAuthMe());

    // setResponseMessage(data.payload.message);

    // if ("token" in data.payload) {
    //   window.localStorage.setItem("token", data.payload.token);
    // }
  };

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
              {
                url:
                  id && id
                    ? `/news-crud-panel/update/${id && id}`
                    : "/news-crud-panel/create",
                name: id && id ? `${id && id}` : "Қосу",
              },
            ]}
          />
          <hr className="basic-hr" />
          <Row>
            <h3>{id && id ? `Жаңарту` : `Жаңалық қосу`}</h3>
            <Col>{id && id}</Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Form onSubmit={handleSubmit(onSubmit)} method="post">
                <Card className="profile-page-card">
                  <Card.Body>
                    <div className="d-flex flex-column justify-content-center">
                      <Row>
                        <Col></Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NewsCUPanel;
