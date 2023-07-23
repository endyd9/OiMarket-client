import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import styles from "../css/Mypage.module.css";
import ItemList from "../components/ItemList";
import { rootUrl } from "..";

const Mypage = () => {
  const [userName, setUserName] = useState("");
  const [userItem, setUserItem] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(6);
  const [page, setPage] = useState(1);

  //다음 페이지 버튼
  const nextPage = () => {
    if (page === Math.ceil(userItem.length / 6)) {
      return alert("마지막 페이지 입니다.");
    }
    setFirstIndex((prev) => (prev += 6));
    setLastIndex((prev) => (prev += 6));
    setPage((prev) => (prev += 1));
  };
  //이전 페이지 버튼
  const prevPage = () => {
    if (page === 1) {
      return alert("첫번째 페이지 입니다");
    }
    setFirstIndex((prev) => (prev -= 6));
    setLastIndex((prev) => (prev -= 6));
    setPage((prev) => (prev -= 1));
  };

  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    getUserData();
  }, []);

  //사용자 정보를 받아옵니다
  const getUserData = async () => {
    const response = await fetch(`${rootUrl}/user/${id}`);
    if (response.status === 200) {
      await response.json().then((data) => {
        const { user } = data;
        setUserName(user.name);
        setUserItem(user.item.reverse());
      });
    }
  };
  return (
    <div className={styles.Mypage}>
      <h1 className={styles.title}>{userName + "님의 오이"}</h1>
      {/*페이지 주인이면 정보수정 보이기*/}
      {cookie.load("loggedInUser") === id ? (
        <Link to={`/user/${id}/edit`}>
          <br />
          <h2 className={styles.userEdit}>회원정보 수정</h2>
        </Link>
      ) : null}
      <div className={styles.userform}>
        <button className={styles.btns} onClick={prevPage}>
          {"<"}
        </button>
        <button className={styles.btns} onClick={nextPage}>
          {">"}
        </button>
        {/* 사용자의 상품이 있으면 표시해주고 없으면 오이가 없넹 */}
        <ul className={styles.useritems}>
          {userItem.length !== 0 ? (
            userItem.slice(firstIndex, lastIndex).map((item) => (
              <li key={item._id} className={styles.item}>
                <ItemList
                  id={item._id}
                  imgUrl={item.imgUrl[0]}
                  title={item.title}
                />
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
