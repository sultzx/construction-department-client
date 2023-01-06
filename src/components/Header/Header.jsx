import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectIsAuth } from "../../redux/slices/auth";

const Header = () => {

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm("Точно шыккын кеп тур ма?")) dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <header>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Link to={"/main"}>
              <Navbar.Brand className="btn btn-outline-light header-brand">
                <img
                  src="https://www.gov.kz/static/media/gerb_sm.aaf449a0.png"
                  width="36px"
                  style={{ opacity: "0.8", marginRight: "8px" }}
                />
                Қарағанды облысының әкімдігі
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
                  <a className="btn btn-outline-light header-link">
                    Жаңалықтар
                  </a>
                </Link>
                <Link to={"/contact"}>
                  <a className="btn btn-outline-light header-link">Байланыс</a>
                </Link>
                { isAuth ? (
                  <>
                    <Link to={"/profile"}>
                      <a className="btn btn-outline-light header-link">
                        Жеке профиль
                      </a>
                    </Link>
                    <a type="button"
                      className="btn btn-outline-light header-link-login"
                      onClick={onClickLogout}
                    >
                      Шығу
                    </a>
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>
                      <a className="btn btn-outline-light header-link-login">
                        Кіру
                      </a>
                    </Link>
                    <Link to={"/registration"}>
                      <a className="btn btn-light header-link-registration">
                        Тіркелу
                      </a>
                    </Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
