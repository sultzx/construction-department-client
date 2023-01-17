import { Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

const BreadLinker = ({links}) => {
  return (
    <Breadcrumb className="breadcrumb-component">
      {links &&
        links.map((link, i) => (
          <>
            <Breadcrumb.Item
              key={i}
              active={link.isActive}
              className="breadcrumb-component-item"
              style={{ color: "#267DB5" }}
            >
              <Link to={link.url}  
                style={{textDecoration: 'none'}}
                className="breadcrumb-component-item">
                {link.name}
              </Link>
            </Breadcrumb.Item>
          </>
        ))}
    </Breadcrumb>
  );
};

export default BreadLinker