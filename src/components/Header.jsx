import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Header.module.css";
import cookie from "react-cookies";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(cookie.load("isLoggedIn"));

  const logout = () => {
    cookie.remove("isLoggedIn");
    cookie.remove("loggedInUser");
    cookie.remove("userName");
    setIsLoggedIn(false);
    window.location.replace("https://endyd9.github.io/OiMarket-client");
  };
  useEffect(() => {
    setIsLoggedIn(cookie.load("loggedInUser"));
  }, [isLoggedIn]);

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
          {cookie.load("isLoggedIn") === undefined ? (
            <div>
              <Link to={`/search`}>
                <li className={styles.menus}>검색</li>
              </Link>
              <Link to={`/join`}>
                <li className={styles.menus}>회원가입</li>
              </Link>
              <Link to={`/login`}>
                <li className={styles.menus}>로그인</li>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={`/search`}>
                <li className={styles.menus}>검색</li>
              </Link>
              <Link to={`/item/upload`}>
                <li className={styles.menus}>오이하기</li>
              </Link>
              <Link to={`/user/${cookie.load("loggedInUser")}/message`}>
                <li className={styles.menus}>메세지</li>
              </Link>
              <Link to={`/user/${cookie.load("loggedInUser")}`}>
                <li className={styles.menus}>내 오이</li>
              </Link>
              <li onClick={logout} className={styles.menus}>
                로그아웃
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default Header;
