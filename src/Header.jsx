import { Link } from "react-router-dom";
import styles from "./css/Header.module.css";

const Header = () => {
  return (
    <div className={styles.Header}>
      <Link to={`/`} className={styles.title}>
        <h1>
          <img
            className={styles.logo}
            src="https://cdn-icons-png.flaticon.com/512/5779/5779419.png"
            alt="logo"
          />
          오이마켓
        </h1>
      </Link>

      <nav>
        <ul>
          <Link to={`/serch`}>
            <li className={styles.menus}>검색</li>
          </Link>
          <Link to={`/join`}>
            <li className={styles.menus}>회원가입</li>
          </Link>
          <Link to={`/login`}>
            <li className={styles.menus}>로그인</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
