import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Header.module.css";
import Session from "react-session-api";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isUser = () => {
    Session.get("loggedInUser") !== undefined
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  };

  const UserMenu = () => {
    return (
      <div>
        <Link to={`/serch`}>
          <li className={styles.menus}>검색</li>
        </Link>
        <Link to={`/join`}>
          <li className={styles.menus}>회원가입</li>
        </Link>
        <Link to={`/login`}>
          <li className={styles.menus}>로그인</li>
        </Link>
      </div>
    );
  };
  const VisiterMenu = () => {
    return (
      <div>
        <Link to={`/serch`}>
          <li className={styles.menus}>검색</li>
        </Link>
        <Link to={`/mypage/:id`}>
          <li className={styles.menus}>마이페이지</li>
        </Link>
        <Link to={`/logout/:id`}>
          <li className={styles.menus}>로그아웃</li>
        </Link>
      </div>
    );
  };

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
        <ul>{isLoggedIn === false ? <UserMenu /> : <VisiterMenu />}</ul>
      </nav>
    </div>
  );
};
export default Header;
