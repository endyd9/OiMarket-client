import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Modal from "react-modal";
import cookie from "react-cookies";
import styles from "../css/EditUser.module.css";

const EditUser = () => {
  const history = useHistory();

  const { id } = useParams();
  if (cookie.load("loggedInUser") !== id) {
    history.push("/");
  }

  const [userData, setUserData] = useState({});
  const [modal, setModal] = useState(false);

  const getUserInfo = async () => {
    const response = await fetch(`http://localhost:4000/user/api/${id}/edit`);
    if (response.status === 200) {
      response.json().then((data) => {
        setUserData(data.user);
      });
    }
  };

  const onPwdChangeClick = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  const changePwd = async () => {
    const pwd = document.getElementById("pwd").value;
    const cpwd1 = document.getElementById("newPwd").value;
    const cpwd2 = document.getElementById("newPwd2").value;

    const response = await fetch(
      `http://localhost:4000/user/api/${id}/edit/pwdCheck`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          pwd,
          cpwd1,
          cpwd2,
        }),
      }
    );
    if (response.status === 403) {
      return alert("원래 비밀번호가 틀림");
    } else if (response.status === 200) {
      return alert("새로운 비밀번호가 일치하지 않습니다");
    }
    alert("비밀번호 변경 완료");
    setModal(false);
  };

  const onSubmitClick = async (event) => {
    event.preventDefault();
    let name = document.getElementById("name");
    let tel = document.getElementById("tel");

    name.value === "" ? (name = name.placeholder) : (name = name.value);
    tel.value === "" ? (tel = tel.placeholder) : (tel = tel.value);

    const phoneChk = new RegExp("^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$");

    if (!phoneChk.test(tel)) {
      return alert("폰번호 확인");
    }
    const phone = tel.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

    const response = await fetch(`http://localhost:4000/user/api/${id}/edit`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
      }),
    });
    if (response.status !== 201) {
      return alert("오류발생 잠시 후 시도하세용");
    }
    alert("회원정보 수정 완료!");
    history.push(`/user/${id}`);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  Modal.setAppElement("#root");

  return (
    <div className={styles.EditUser}>
      <Modal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            zIndex: 2,
          },
          content: {
            position: "absolute",
            top: "100px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "rgb(123, 145, 119)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
            textAlign: "center",
            verticalAlign: "center",
          },
        }}
      >
        <form className={styles.changePwd}>
          <span className={styles.pwdChk}>
            원래 비밀번호
            <br />
            <input type="password" id="pwd" />
          </span>
          <br />
          <span className={styles.newPwd}>
            새로운 비밀번호
            <br />
            <input type="password" id="newPwd" />
          </span>
          <span className={styles.newPwd2}>
            <br />
            새로운 비밀번호 확인
            <br />
            <input type="password" id="newPwd2" />
          </span>
          <br />
          <button type="button" onClick={changePwd} className={styles.pwdCbtn}>
            비밀번호 변경
          </button>
        </form>
      </Modal>
      <h1 className={styles.title}>회원정보 수정</h1>
      <div className={styles.userinfo}>
        <form className={styles.editform}>
          <span className={styles.name}>
            이름
            <br />
            <input
              type="text"
              name="name"
              id="name"
              placeholder={`${userData.name}`}
            />
          </span>
          <br />
          <span className={styles.email}>
            이메일
            <br />
            <input
              type="email"
              name="email"
              id="email"
              readOnly
              placeholder={`${userData.email}`}
            />
          </span>
          <br />
          <span className={styles.id}>
            아이디
            <br />
            <input
              type="text"
              name="id"
              id="id"
              readOnly
              placeholder={`${userData.userId}`}
            />
          </span>
          <br />
          <span className={styles.pwd}>
            비밀번호
            <br />
            <br />
            <button onClick={onPwdChangeClick} type="button">
              비밀번호 변경
            </button>
          </span>
          <br />
          <br />
          <span className={styles.phone}>
            전화번호
            <br />
            <input
              type="tel"
              name="tel"
              id="tel"
              placeholder={userData?.phone?.replaceAll("-", "")}
            />
          </span>
          <span className={styles.submit}>
            <br />
            <input
              onClick={onSubmitClick}
              type="submit"
              value="변경사항 저장"
            />
          </span>
        </form>
      </div>
    </div>
  );
};
export default EditUser;
