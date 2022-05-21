import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import { ListType } from "../redux/appointment/types";

interface SlotProps {
  item: ListType;
}

const Slot = ({ item }: SlotProps) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        {item.start} - {item.end}
      </td>
      <td>{item.capacity}</td>
      <td>
        <Link to="#" className="me-3">
          <Image src={Edit} alt="" />
        </Link>{" "}
        <Link to="#">
          <Image src={Delete} alt="" />
        </Link>
      </td>
    </tr>
  );
};

export default Slot;
