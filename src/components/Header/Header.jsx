import { Container, Navbar, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectIsAuth } from "../../redux/slices/auth";
import blueProfile from "../../images/blue-profile.png";

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
                {/* <Link to={"/main"}>
                  <a className="btn btn-outline-light header-link">Басты бет</a>
                </Link> */}
                <Link to={"/construction-department"}>
                  <a className="btn btn-outline-light header-link">
                    Құрылыс бөлімі
                  </a>
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
                {isAuth ? (
                  <>
                    <NavDropdown
                      active
                      title={userData.firstname + " " + userData.lastname}
                    >
                      <NavDropdown.Item >
                        <Link to={"/profile"}>
                          Жеке профиль
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={onClickLogout}>
                        Шығу
                      </NavDropdown.Item>
                    </NavDropdown>
                    <img
                      className="rounded-circle shadow cover"
                      width="42px"
                      height="auto"
                      src={userData ? userData.avatarUrl : blueProfile}
                      alt={"profile"}
                    />
                  </>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      className="btn btn-outline-light header-link-login">
                      Кіру
                    </Link>
                    <Link
                      to={"/registration"}
                      className="btn btn-light header-link-registration">
                      Тіркелу
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
