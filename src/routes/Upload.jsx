import { useEffect } from "react";
import styles from "../css/Upload.module.css";
import cookie from "react-cookies";
import { rootUrl } from "..";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Upload = () => {
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmitClick = async (event) => {
    event.preventDefault();
    const form = document.getElementById("form");

    const payload = new FormData(form);
    payload.append("uploader", cookie.load("loggedInUser"));

    const response = await (
      await fetch("http://localhost:4000/item/upload", {
        method: "post",
        body: payload,
      })
    ).status;

    if (response !== 201) {
      return alert("업로드 실패!");
    }
    alert("업로드 성공!");
    nav("/");
  };

  return (
    <div className={styles.Upload}>
      <h1 className={styles.title}>오이 하십셔</h1>
      <div className={styles.uploadForm}>
        <form id="form" onSubmit={onSubmitClick} encType="multipart/form-data">
          <input
            className={styles.postTitle}
            type="text"
            name="tittle"
            id="title"
            placeholder="제목"
            {...register("title")}
          />

          <input
            className={styles.uploadImg}
            type="file"
            name="img"
            id="img"
            accept="image/*"
            multiple
            {...register("images")}
          />
          <textarea
            className={styles.description}
            name="description"
            id="description"
            maxLength="500"
            cols="30"
            rows="10"
            placeholder="상품 설명을 써주세요 자세하게"
            {...register("description")}
          ></textarea>
          <input
            className={styles.tags}
            type="text"
            name="tags"
            id="tag"
            placeholder="해시태그를 , 로 구분하여 작성해주세용"
            {...register("tag")}
          />
          <input type="submit" value="업로드" />
        </form>
      </div>
    </div>
  );
};

export default Upload;
