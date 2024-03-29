/* eslint-disable */
import { useEffect, useState } from "react";
import styles from "../css/Home.module.css";
import ItemList from "../components/ItemList";
import { rootUrl } from "..";

const Home = () => {
  const [hotitem, setHotitem] = useState([]);
  const [newitem, setNewitem] = useState([]);

  //상품 목록 불러올 api
  const getItems = async () => {
    //새상품 검색용 오늘 날짜
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const today = `${year}-${month < 9 ? "0" + month : month}-${
      day < 9 ? "0" + day : day
    }`;
    const response = await fetch(`${rootUrl}/`);
    response.json().then((data) => {
      const newitmes = [];
      const hotitems = [];
      // 새로운 상품 있으면 저장하고 없으면 넘기기
      data.newitem.forEach((item) => {
        item.createdAt.substring(0, 10) === today && item.status === false
          ? newitmes.push(item)
          : null;
      });
      // 위와 같은데 인기있는 상품임
      data.hotitem.forEach((item) => {
        item.meta.views > 0 && item.status === false
          ? hotitems.push(item)
          : null;
      });
      // 인기상품 조회수 순으로 10개 잘라넣기
      setHotitem(hotitems.slice(0, 10));
      // 새 상품 최신순으로 10개 잘라넣기
      setNewitem(newitmes.slice(0, 10));
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getItems();
  }, []);

  return (
    <div className={styles.Home}>
      <section className={styles.sections}>
        <h1>인기 상품</h1>
        <div>
          <ul className={styles.items}>
            {hotitem.length === 0 ? (
              <li className={styles.noitem}>상품이 없어용</li>
            ) : (
              hotitem.map((item) => (
                <li key={item._id} className={styles.item}>
                  <ItemList
                    id={`${item._id}`}
                    title={`${item.title}`}
                    imgUrl={`${item.imgUrl[0]}`}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
      <section className={styles.sections}>
        <h1>오늘의 올라온 상품</h1>
        <div>
          <ul className={styles.items}>
            {newitem.length === 0 ? (
              <li className={styles.noitem2}>상품이 없어용</li>
            ) : (
              newitem.map((item) => (
                <li key={item._id} className={styles.item}>
                  <ItemList
                    key={item._id}
                    id={`${item._id}`}
                    title={`${item.title}`}
                    imgUrl={`${item.imgUrl[0]}`}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
