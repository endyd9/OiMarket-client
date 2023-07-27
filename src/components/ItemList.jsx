import { Link } from "react-router-dom";

const ItemList = ({ id, title, imgUrl }) => {
  return (
    <div>
      <Link to={`/item/${id}`}>
        <img src={`${imgUrl}`} alt="cover" />
        <h3>{title}</h3>
      </Link>
    </div>
  );
};

export default ItemList;
