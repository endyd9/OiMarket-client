// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Item = ({ id, title, coverImg }) => {
  return (
    <div>
      <Link to={`/itme/${id}`}></Link>
      <img src={coverImg} alt="cover" />
      <h3>{title}</h3>
    </div>
  );
};

// Item.PropTypes = {
//   id: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   coverImg: PropTypes.string.isRequired,
// };

export default Item;
