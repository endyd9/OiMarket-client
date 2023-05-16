import styles from "../css/Search.module.css";

const Search = () => {
  return (
    <div className={styles.Search}>
      <input type="text" placeholder="여기가 검색창" />
      <div>
        <h1>여기 검색결과</h1>
      </div>
    </div>
  );
};

export default Search;
