import styles from "../css/Search.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ItemList from "../components/ItemList";

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [keyword, setKeyword] = useState("");
  const [itemList, setItemList] = useState([]);
  const [userKeyword, setUserKeyword] = useState("");

  //검색어에 맞는 item 불러와버리기
  const onSearch = async (event) => {
    if (event.key === "Enter" || event.key === undefined) {
      if (keyword === "") {
        return alert("검색어를 입력하세용");
      }
      setUserKeyword(`"${keyword}"의 검색결과`);
      const response = await fetch(
        `http://localhost:4000/api/search/${encodeURIComponent(keyword)}`
      );
      if (response.status === 200) {
        await response.json().then((data) => {
          const items = [];
          data.item.forEach((i) => {
            items.push(i);
          });
          setItemList(items);
        });
      } else {
        setItemList([]);
      }
    }
  };
  return (
    <div className={styles.Search}>
      <input
        className={styles.searchBar}
        name="searchBar"
        onKeyPress={onSearch}
        onChange={(event) => setKeyword(event.target.value)}
        type="text"
        placeholder="상품을 검색해 보세요"
      />
      <FontAwesomeIcon
        className={styles.searchBtn}
        onClick={onSearch}
        icon={faSearch}
      />
      <div className={styles.searchItems}>
        <div className={styles.searchResult}>
          <h1>{userKeyword}</h1>
          <ul className={styles.items}>
            {itemList.length > 0 ? (
              itemList.map((item) => (
                <li key={item._id} className={styles.item}>
                  <ItemList
                    id={item._id}
                    imgUrl={item.imgUrl[0]}
                    title={item.title}
                  />
                </li>
              ))
            ) : (
              <li className={styles.noitem}>
                {userKeyword === "" ? null : <h1>검색결과가 없습니다</h1>}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
