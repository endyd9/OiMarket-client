import { useEffect } from "react";
import styles from "../css/Upload.module.css";
import cookie from "react-cookies";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { rootUrl } from "..";

const Upload = () => {
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onSubmitClick = async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const imgs = [...document.getElementById("img").files];
    const description = document.getElementById("description").value;
    const tag = document.getElementById("tag").value;

    if (title === "") {
      return alert("제목을 쓰세용");
    } else if (imgs.length === 0) {
      return alert("사진을 선택하세용");
    }

    // 업로드할 이미지 base64로 인코딩
    const incodingImg = [];
    imgs.forEach((img, index) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const url = URL.createObjectURL(img);
      const image = new Image();
      image.src = url;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        // 앞에 필요없는 부분 잘라내서 배열에 담기
        incodingImg.push(
          `${canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")}`
        );
      };
    });

    //태그 쪼개기
    const tags = [...tag.split(",")];

    // 업로드 요청 이미지 인코딩 시간걸려서 타임아웃 처리
    setTimeout(async () => {
      const response = await fetch(`${rootUrl}/item/upload`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          uploader: cookie.load("loggedInUser"),
          title,
          incodingImg,
          description,
          tags,
        }),
      });
      if (response.status !== 201) {
        return alert("업로드 실패!");
      }
      alert("업로드 성공!");
      history.push("/");
    }, 100);
  };
  return (
    <div className={styles.Upload}>
      <h1 className={styles.title}>오이 하십셔</h1>
      <div className={styles.uploadForm}>
        <form>
          <input
            className={styles.postTitle}
            type="text"
            name="tittle"
            id="title"
            placeholder="제목"
          />

          <input
            className={styles.uploadImg}
            type="file"
            name="img"
            id="img"
            accept="image/*"
            multiple
          />
          <textarea
            className={styles.description}
            name="description"
            id="description"
            maxLength="500"
            cols="30"
            rows="10"
            placeholder="상품 설명을 써주세요 자세하게"
          ></textarea>
          <input
            className={styles.tags}
            type="text"
            name="tags"
            id="tag"
            placeholder="해시태그를 , 로 구분하여 작성해주세용"
          />
          <input type="submit" onClick={onSubmitClick} value="업로드" />
        </form>
      </div>
    </div>
  );
};

export default Upload;
