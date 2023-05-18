import styles from "../css/Search.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [keyword, setKeyword] = useState("");
  const [itemList, setItemList] = useState([]);
  const [userKeyword, setUserKeyword] = useState("");

  //검색 api만들어라 미래의 나!
  const onSearch = (event) => {
    if (event.key === "Enter" || event.key === undefined) {
      //fetch 해버릴 예정
      setItemList([...itemList, "아무것도 없지롱"]);
      setUserKeyword(`"${keyword}" 검색결과`);
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
            {/* 디비 연결하면 key값 id로 바꾸셈 */}
            {itemList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
