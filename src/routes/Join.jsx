import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../css/Join.module.css";

const Join = () => {
  let histoey = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [idExists, setIdexists] = useState(true);
  const [month, setMonth] = useState(0);
  //회원가입 요청
  const onSubmit = async (event) => {
    event.preventDefault();
    if (idExists) {
      return alert("ID 중복체크 해주세용");
    }
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const userId = document.getElementById("id").value;
    const pass = document.getElementById("pass").value;
    const cpass = document.getElementById("cpass").value;
    const year = parseInt(document.getElementById("year").value);
    const day = parseInt(document.getElementById("day").value);
    const tel = document.getElementById("tel").value;

    //유효성 검사

    //이메일 체크
    const emailChk = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!emailChk.test(email)) {
      return alert("email을 다시 확인하세욧");
    }

    //비번 체크
    const passChk = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&]{8,}"
    );
    if (!passChk.test(pass)) {
      return alert(
        "비밀번호는 최소 8 자, 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상"
      );
    } else {
      if (pass !== cpass) {
        return alert("비밀번호가 일치하지 않습니다");
      }
    }
    //생년월일 체크
    if (year < 1900 || year > new Date().getFullYear()) {
      return alert("생년월일을 확인하세요");
    }
    switch (true) {
      case month === "2":
        if (parseInt(day) > 29) {
          return alert("생년월일을 확인하세요");
        }
        break;
      case ["1", "3", "5", "7", "8", "10", "12"].includes(month):
        if (parseInt(day) > 31) {
          return alert("생년월일을 확인하세요");
        }
        break;
      case ["4", "6", "9", "11"].includes(month):
        if (parseInt(day) > 30) {
          return alert("생년월일을 확인하세요");
        }
        break;
    }
    const birth = `${year}-${parseInt(month) < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    //폰번호 체크
    const phoneChk = new RegExp("^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$");

    if (!phoneChk.test(tel)) {
      return alert("폰번호 확인");
    }
    const phone = tel.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

    //유효성 검사 끗

    // 가입요청
    const response = await fetch("http://localhost:4000/api/join", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        userId,
        pass,
        birth,
        phone,
      }),
    });
    if (response.status === 409) {
      alert("이미 가입된 회원정보입니다");
    } else if (response.status === 400) {
      alert("엥 왜 안되지");
    } else if (response.status === 201) {
      alert("가입성공");
      histoey.push("/login");
    }
  };

  //id 중복체크
  const idChk = async () => {
    const id = document.getElementById("id").value;

    if (id === "") {
      return alert("공백이잖아");
    } else if (id.length < 5) {
      return alert("5자 이상 영문 숫자를 섞어주세용");
    }
    const response = await fetch("http://localhost:4000/api/idExists", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.status === 200) {
      setIdexists(false);
      alert("사용가능한 아이디입니다");
    } else {
      setIdexists(true);
      alert("이미 존재하는 아이디입니다");
    }
  };
  return (
    <div className={styles.Join}>
      <h1 className={styles.title}>회원가입</h1>
      <div className={styles.joinForm}>
        <div className={styles.userInfo}>
          <form>
            <span className={styles.name}>
              이름
              <br />
              <input type="name" name="name" id="name" required />
            </span>
            <br />
            <span className={styles.email}>
              e-mail
              <br />
              <input type="email" name="email" id="email" required />
            </span>
            <br />
            <span className={styles.id}>
              ID
              <br />
              {/* 중복체크하고 아이디 바꾸는거 방지 */}
              <input
                onChange={() => setIdexists(true)}
                type="text"
                name="id"
                id="id"
              />
              <button onClick={idChk} type="button" className={styles.idChk}>
                ID 중복 확인
              </button>
            </span>
            <br />
            <span className={styles.pwd}>
              비밀번호 <br />
              <input type="password" name="password" id="pass" required />
              <br />
              비밀번호 확인
              <br />
              <input type="password" name="pwdCheck" id="cpass" required />
            </span>
            <br />
            <span className={styles.birth}>
              생년월일
              <br />
              <input
                type="number"
                name="year"
                id="year"
                placeholder="출생년도"
              />{" "}
              -{" "}
              <select
                onChange={(event) => setMonth(event.target.value)}
                name="month"
                id="month"
              >
                <option defaultValue="true">월</option>
                <option value="1">1월</option>
                <option value="2">2월</option>
                <option value="3">3월</option>
                <option value="4">4월</option>
                <option value="5">5월</option>
                <option value="6">6월</option>
                <option value="7">7월</option>
                <option value="8">8월</option>
                <option value="9">9월</option>
                <option value="10">10월</option>
                <option value="11">11월</option>
                <option value="12">12월</option>
              </select>{" "}
              - <input type="number" id="day" placeholder="일" required />
            </span>
            <br />
            <span className={styles.tel}>
              <label htmlFor="tel">
                전화번호
                <br />
                <input
                  type="text"
                  pattern="[0-9]+"
                  name="tel"
                  id="tel"
                  required
                />
              </label>
            </span>
            <br />
            <input
              onClick={onSubmit}
              type="submit"
              className={styles.joinBtn}
              value="회원가입"
            />
          </form>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Join;
