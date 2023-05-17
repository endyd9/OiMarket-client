import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../css/Header.module.css";
import Session from "react-session-api";
import cookie from "react-cookies";

const Header = () => {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(cookie.load("isLoggedIn"));

  // const isUser = () => {
  //   console.log(Session.get("loggedInUser"));
  //   Session.get("loggedInUser") !== undefined
  //     ? setIsLoggedIn(true)
  //     : setIsLoggedIn(false);
  // };

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
        <Link to={`/mypage/${cookie.load("loggedInUser")}`}>
          <li className={styles.menus}>마이페이지</li>
        </Link>
        <li onClick={logout} className={styles.menus}>
          로그아웃
        </li>
      </div>
    );
  };
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
            <UserMenu />
          ) : (
            <VisiterMenu />
          )}
        </ul>
      </nav>
    </div>
  );
};
export default Header;
