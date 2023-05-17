import { useHistory } from "react-router-dom";
import Session from "react-session-api";
import cookie from "react-cookies";
import styles from "../css/Login.module.css";
import Header from "../components/Header";

const Login = () => {
  let history = useHistory();
  //api는 역순으로 크크루삥뽕
  const onLoginClick = async () => {
    const id = document.getElementById("id").value;
    const pass = document.getElementById("pass").value;
    const response = await fetch("http://localhost:4000/api/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        pass,
      }),
    });
    if (response.status === 200) {
      cookie.save("isLoggedIn", true);
      await response
        .json()
        .then((data) => cookie.save("loggedInUser", data.id));
      // history.push("/");

      // 새로고침 하기 시른디
      window.location.replace("/");
    } else if (response.status === 403) {
      alert("아이디 비번 다시 확인");
    }
  };

  return (
    <div className={styles.Login}>
      <h1 className={styles.title}>로그인</h1>
      <div className={styles.loginForm}>
        <div className={styles.userInfo}>
          <form>
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
