import { Container, Row, Col } from "react-bootstrap";
import BreadLinker from "../../BreadLinker/BreadLinker.jsx";

const CreateNews = () => {
  return (
    <>
      <Container>
        <BreadLinker
          links={[
            {
              url: "/main",
              name: "Басты бет",
              isActive: false,
            },
            {
              url: "/profile",
              name: "Модератор профилі",
              isActive: false,
            },
            {
                url: "/create_news",
                name: "Жаңалық құру",
                isActive: true,
              },
          ]}
        />
        <hr className="basic-hr" />
      </Container>
    </>
  );
};

export default CreateNews;
