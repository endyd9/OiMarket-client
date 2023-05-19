import { Link } from "react-router-dom";

const ItemList = ({ _id, title, imgUrl }) => {
  return (
    <div>
      <Link to={`/itme/${_id}`}>
        <img src={`http://localhost:4000/${imgUrl}`} alt="cover" />
        <h3>{title}</h3>
      </Link>
    </div>
  );
};

export default ItemList;
