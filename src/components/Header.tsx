import { Col, Image, Row } from "react-bootstrap";
import HeadImg from "../assets/image1.svg";

interface HeaderProps {
  title: String;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <Row>
      <Col>
        <div className="d-flex align-items-center">
          <Image src={HeadImg} alt="" />
          <h5 className="mb-0 ms-2 heading">{title}</h5>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
