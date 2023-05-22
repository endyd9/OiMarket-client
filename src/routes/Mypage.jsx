import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import styles from "../css/Mypage.module.css";

const Mypage = () => {
  const [userName, setUserName] = useState("");
  const [userItem, setUserItem] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(6);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    if (page === Math.ceil(userItem.length / 6)) {
      return alert("마지막 페이지 입니다.");
    }
    setFirstIndex((prev) => (prev += 6));
    setLastIndex((prev) => (prev += 6));
    setPage((prev) => (prev += 1));
  };
  const prevPage = () => {
    if (page === 1) {
      return alert("첫번째 페이지 입니다");
    }
    setFirstIndex((prev) => (prev -= 6));
    setLastIndex((prev) => (prev -= 6));
    setPage((prev) => (prev -= 1));
  };

  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    getUserData();
  }, []);
  const getUserData = async () => {
    const response = await fetch(
      `http://localhost:4000/user/api/user-data/${id}`,
      {
        method: "post",
      }
    );
    if (response.status === 200) {
      await response.json().then((data) => {
        const { user } = data;
        setUserName(user.name);
        setUserItem(user.item);
      });
    } else {
    }
  };
  return (
    <div className={styles.Mypage}>
      <h1 className={styles.title}>{userName + "님의 오이"}</h1>
      {cookie.load("loggedInUser") === id ? (
        <Link to={`/user/${id}/edit`}>
          <br />
          <h2>회원정보 수정</h2>
        </Link>
      ) : null}
      <div className={styles.userform}>
        <button className={styles.btns} onClick={prevPage}>
          {"<"}
        </button>
        <button className={styles.btns} onClick={nextPage}>
          {">"}
        </button>
        <ul className={styles.useritems}>
          {userItem.length !== 0 ? (
            userItem.slice(firstIndex, lastIndex).map((item) => (
              <li key={item._id} className={styles.item}>
                <Link to={`/item/${item._id}`}>
                  <img
                    src={
                      item.imgUrl.length > 0
                        ? `http://localhost:4000/${item.imgUrl[0]}`
                        : `http://localhost:4000/${item.imgUrl}`
                    }
                    alt="커버이미지"
                  />
                  <h3>{item.title}</h3>
                </Link>
              </li>
            ))
          ) : (
            <li className={styles.noitem}>오이가 없넹</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Mypage;
