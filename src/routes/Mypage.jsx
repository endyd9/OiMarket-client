import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import styles from "../css/Mypage.module.css";

const Mypage = () => {
  const [userName, setUserName] = useState("");
  const [userItem, setUserItem] = useState([]);

  // const testItem = [
  //   {
  //     _id: "더미키",
  //     title: "더미데이터",
  //     imgUrl: "https://t1.daumcdn.net/cfile/tistory/992032395A950FEB01",
  //   },
  //   {
  //     _id: "더미키1",
  //     title: "더미데이터",
  //     imgUrl: "https://t1.daumcdn.net/cfile/tistory/992032395A950FEB01",
  //   },
  //   {
  //     _id: "더미키2",
  //     title: "더미데이터",
  //     imgUrl: "https://t1.daumcdn.net/cfile/tistory/992032395A950FEB01",
  //   },
  //   {
  //     _id: "더미키3",
  //     title: "더미데이터",
  //     imgUrl: "https://t1.daumcdn.net/cfile/tistory/992032395A950FEB01",
  //   },
  //   {
  //     _id: "더미키4",
  //     title: "더미데이터",
  //     imgUrl: "https://t1.daumcdn.net/cfile/tistory/992032395A950FEB01",
  //   },
  //   {
  //     _id: "더미키5",
  //     title: "더미데이터",
  //     imgUrl: "https://t1.daumcdn.net/cfile/tistory/992032395A950FEB01",
  //   },
  //   {
  //     _id: "더미키6",
  //     title: "더미데이터",
  //     imgUrl: "https://t1.daumcdn.net/cfile/tistory/992032395A950FEB01",
  //   },
  //   {
  //     _id: "더미키7",
  //     title: "더미데이터",
  //     imgUrl: "https://t1.daumcdn.net/cfile/tistory/992032395A950FEB01",
  //   },
  //   {
  //     _id: "더미키8",
  //     title: "더미데이터",
  //     imgUrl: "https://t1.daumcdn.net/cfile/tistory/992032395A950FEB01",
  //   },
  // ];

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
      <div className={styles.userform}>
        <ul className={styles.useritems}>
          {userItem.length !== 0 ? (
            userItem.map((item) => (
              <li key={item._id} className={styles.item}>
                <Link to={`/item/${item._id}`}>
                  <img
                    src={`http://localhost:4000/${item.imgUrl}`}
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
