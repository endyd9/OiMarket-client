import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../css/Header.module.css";
import cookie from "react-cookies";

const Header = () => {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(cookie.load("isLoggedIn"));

  const logout = () => {
    cookie.remove("isLoggedIn");
    cookie.remove("loggedInUser");
    console.log(cookie.load("loggedInUser"));
    setIsLoggedIn(cookie.load("loggedInUser"));
    history.push("/");
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
          ) : (
            <div>
              <Link to={`/serch`}>
                <li className={styles.menus}>검색</li>
              </Link>
              <Link to={`/item/upload`}>
                <li className={styles.menus}>오이하기</li>
              </Link>
              <li className={styles.menus}>메세지</li>
              <Link to={`/mypage/${cookie.load("loggedInUser")}`}>
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
