import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Session from "react-session-api";
import styles from "../css/Login.module.css";

const Login = () => {
  //api는 역순으로 크크루삥뽕
  const onLoginClick = async () => {
    const id = document.getElementById("id").value;
    const pass = document.getElementById("pass").value;
    const response = await fetch("http://localhost:4000/api/login", {
      method: "post",
    });
    if (response.status === 200) {
      console.log(response.status);
      await response
        .json()
        .then((data) => Session.set("loogedInUser", data.id));
      Redirect("/");
    }
  };

  return (
    <div className={styles.Login}>
      <h1 className={styles.title}>로그인</h1>
      <div className={styles.loginForm}>
        <div className={styles.userInfo}>
          <span>
            <input type="text" name="id" id="id" placeholder="ID" />
            <br />
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="PASSWORD"
            />
            <br />
          </span>
          <button onClick={onLoginClick} className={styles.loginBtn}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
