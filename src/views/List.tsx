import { Col, Container, Row, Table } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Slot from "../components/Slot";

const List = () => {
  const { list } = useSelector((state: any) => state.appointment);

  return (
    <Container className="mt-5 mb-5">
      <Header title="APPOINTMENT SLOT (4)" />
      <hr></hr>
      <p className="text-end">
        <Link to="/">Create Appointment</Link>
      </p>
      <Row>
        <Col>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Slot Timing</th>
                <th>Seating Capacity</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map((item: any, index: number) => (
                  <Slot item={item} key={`key${index}`} />
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No appointments found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default List;
