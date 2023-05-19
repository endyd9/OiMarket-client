import { Link } from "react-router-dom";

const ItemList = ({ id, title, coverImg }) => {
  return (
    <div>
      <Link to={`/itme/${id}`}></Link>
      <img src={coverImg} alt="cover" />
      <h3>{title}</h3>
    </div>
  );
};

export default ItemList;
