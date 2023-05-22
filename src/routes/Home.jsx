/* eslint-disable */
import { useEffect, useState } from "react";
import styles from "../css/Home.module.css";
import ItemList from "../components/ItemList";

const Home = () => {
  const [hotitem, setHotitem] = useState([]);
  const [newitem, setNewitem] = useState([]);

  //상품 목록 불러올 api
  const getItems = async () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const today = `${year}-${month < 9 ? "0" + month : month}-${
      day < 9 ? "0" + day : day
    }`;
    const response = await fetch("http://localhost:4000/item/api/mainItems", {
      method: "post",
    });
    response.json().then((data) => {
      const newitmes = [];
      const hotitems = [];
      data.newitem.forEach((item) => {
        item.createdAt.substring(0, 10) === today ? newitmes.push(item) : null;
      });
      data.hotitem.forEach((item) => {
        hotitems.push(item);
      });
      setHotitem(hotitems.slice(0, 10));
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
                    key={item._id}
                    _id={`${item._id}`}
                    title={`${item.title}`}
                    imgUrl={`${item.imgUrl}`}
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
                    _id={`${item._id}`}
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
