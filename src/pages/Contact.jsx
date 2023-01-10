import { Container, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchAuth, selectIsAuth } from "../redux/slices/auth.js";

const Contact = () => {

  const isAuth = useSelector(selectIsAuth)

  return (
    <>
      <Alert
        variant={!isAuth ? "warning" : "primary"}
        style={
            !isAuth
            ? { borderRadius: "1px", borderColor: "yellow" }
            : { borderRadius: "1px" }
        }>
        {
          <div className="text-center" style={{ margin: "-12px" }}>
            {!isAuth && <span>Жүйедегі толық ақпараттарға қол жеткізу үшін тіркеліңіз немесе кіріңіз</span>}
          </div>
        }
      </Alert>
    </>
  );
};

export default Contact;
