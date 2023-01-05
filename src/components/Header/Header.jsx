import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";

const Header = () => {
  return (
    <>
      <header>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Link to={"/main"}>
              <Navbar.Brand className="btn btn-outline-light header-brand">
                React-Bootstrap
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
              <Link to={"/main"}>
                    <a className="btn btn-outline-light header-link">Басты бет</a>
                </Link>
                <Link to={"/construction-department"}>
                    <a className="btn btn-outline-light header-link">Құрылыс</a>
                </Link>
                <Link to={"/projects"}>
                    <a className="btn btn-outline-light header-link">Жобалар</a>
                </Link>
                <Link to={"/news"}>
                    <a className="btn btn-outline-light header-link">Жаңалықтар</a>
                </Link>
                <Link to={"/contact"}>
                    <a className="btn btn-outline-light header-link">Байланыс</a>
                </Link>
                <Link to={"/login"}>
                    <a className="btn btn-outline-light header-link-login">Кіру</a>
                </Link>
                <Link to={"/registration"}>
                    <a className="btn btn-light header-link-registration">Тіркелу</a>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
