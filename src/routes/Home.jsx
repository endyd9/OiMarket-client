/* eslint-disable */
import { useEffect, useState } from "react";
import styles from "../css/Home.module.css";
import ItemList from "../components/ItemList";

const Home = () => {
  //상품 목록 불러올 api 만들어라
  const getItems = async () => {
    const hot = [];
    const newest = [];
    const json = await fetch("http://localhost:4000/api/mainItems", {
      method: "post",
    });
    console.log(json.status);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getItems();
  }, []);

  return (
    <div className={styles.Home}>
      <section className={styles.sections}>
        <h1>오늘의 인기 상품</h1>
        <div>
          <ul className={styles.items}>
            <li className={styles.item}>
              <ItemList
                id={`test`}
                title={`테스트제목`}
                corverImg={`이미지 없다`}
              />
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.sections}>
        <h1>오늘의 올라온 상품</h1>
        <div>
          <ul className={styles.items}>
            <li>
              <ItemList
                id={`test`}
                title={`테스트제목`}
                corverImg={`이미지 없다`}
              />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
