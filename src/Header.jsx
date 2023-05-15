import { Link } from "react-router-dom";
import styles from "./css/Header.module.css";

const Header = () => {
  return (
    <div className={styles.Header}>
      <Link to={`/`}>
        <h1 className={styles.title}>짭근마켓</h1>
      </Link>

      <nav>
        <ul>
          <Link to={`/serch`}>
            <li>검색</li>
          </Link>
          <Link to={`/join`}>
            <li>회원가입</li>
          </Link>
          <Link to={`/login`}>
            <li>로그인</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
