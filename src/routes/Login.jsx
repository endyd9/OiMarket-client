// import { useHistory } from "react-router-dom";
import cookie from "react-cookies";
import styles from "../css/Login.module.css";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // let history = useHistory();
  const onLoginClick = async (event) => {
    event.preventDefault();
    const userId = document.getElementById("id").value;
    const pass = document.getElementById("pass").value;
    const response = await fetch("http://localhost:4000/api/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId,
        pass,
      }),
    });
    if (response.status === 403) {
      return alert("아이디 비번 다시 확인");
    } else if (response.status === 200) {
      cookie.save("isLoggedIn", true);
      await response
        .json()
        .then((data) => cookie.save("loggedInUser", data.user));
      // history.push("/");

      // 새로고침 하기 시른디
      window.location.replace("/");
    }
  };

  return (
    <div className={styles.Login}>
      <h1 className={styles.title}>로그인</h1>
      <div className={styles.loginForm}>
        <div className={styles.userInfo}>
          <form method="post">
            <input type="text" name="id" id="id" placeholder="ID" />
            <br />
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="PASSWORD"
            />
            <br />
            <button onClick={onLoginClick} className={styles.loginBtn}>
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
