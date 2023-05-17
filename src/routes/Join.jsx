import styles from "../css/Join.module.css";

const Join = () => {
  //미래의 나 기능구현 하도록
  const postUserInfo = () => {
    console.log("하아 이거 언제 다 구현하나");
  };
  return (
    <div className={styles.Join}>
      <h1 className={styles.title}>회원가입</h1>
      <div className={styles.joinForm}>
        <div className={styles.userInfo}>
          <span className={styles.name}>
            이름
            <br />
            <input type="name" name="name" />
          </span>
          <br />
          <span className={styles.email}>
            e-mail
            <br />
            <input type="email" name="email" />
          </span>
          <br />
          <span className={styles.id}>
            ID
            <br />
            <input type="text" name="id" />
            <button className={styles.idChk}>ID 중복 확인</button>
          </span>
          <br />
          <span className={styles.pwd}>
            비밀번호 <br />
            <input type="password" name="password" />
            <br />
            비밀번호 확인
            <br />
            <input type="password" name="pwdCheck" />
          </span>
          <br />
          <span className={styles.birth}>
            생년월일
            <br />
            <input type="number" name="year" placeholder="출생년도" /> -{" "}
            <select name="month">
              <option defaultValue="true">월</option>
              <option value="">1월</option>
              <option value="">2월</option>
              <option value="">3월</option>
              <option value="">4월</option>
              <option value="">5월</option>
              <option value="">6월</option>
              <option value="">7월</option>
              <option value="">8월</option>
              <option value="">9월</option>
              <option value="">10월</option>
              <option value="">11월</option>
              <option value="">12월</option>
            </select>{" "}
            - <input type="number" placeholder="일" />
          </span>
          <br />
          <span className={styles.tel}>
            <label htmlFor="tel">
              전화번호
              <br />
              <input type="tel" name="tel" />
            </label>
          </span>
        </div>
        <br />
        <br />
        <button className={styles.joinBtn}>회원가입</button>
      </div>
    </div>
  );
};

export default Join;
