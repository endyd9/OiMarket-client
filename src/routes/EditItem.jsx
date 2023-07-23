import { useEffect, useState } from "react";
import cookie from "react-cookies";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { rootUrl } from "..";
import styles from "../css/EditItem.module.css";

const EditItem = () => {
  const { id } = useParams();
  const history = useHistory();

  const [item, setItem] = useState({});

  //수정할 상품 기존 데이터 받아오기
  const getItemInfo = async () => {
    const response = fetch(`${rootUrl}/item/${id}`);
    if ((await response).status === 200) {
      (await response).json().then(async (data) => {
        setItem(data.item);
        //업로더가 아니면 돌려보내기
        if (data.item.owner._id !== cookie.load("loggedInUser")) {
          alert("접근권한이 없습니다!!!");
          return history.push("/");
        }
      });
    }
  };
  const onSubmitBtnClick = async (event) => {
    event.preventDefault();
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let tag = document.getElementById("tag");

    title.value === "" ? (title = title.placeholder) : (title = title.value);
    description.value === ""
      ? (description = description.placeholder)
      : (description = description.value);
    tag.value === "" ? (tag = tag.placeholder) : (tag = tag.value);

    const tags = [...tag.split(",")];

    const response = await fetch(`${rootUrl}/item/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        tags,
      }),
    });
    if (response.status === 404) {
      return alert("다시 시도하세용");
    }
    alert("수정완료!");
    return history.push(`/item/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getItemInfo();
  }, []);

  return (
    <div className={styles.EditItem}>
      <h1 className={styles.title}>글 수정</h1>
      <div className={styles.editForm}>
        <form>
          <input
            className={styles.itemTitle}
            type="text"
            id="title"
            placeholder={`${item.title}`}
          />
          <br />
          <textarea
            className={styles.description}
            type="text"
            id="description"
            placeholder={`${item.description}`}
          />
          <input
            className={styles.tag}
            type="text"
            id="tag"
            placeholder={`${item.hashtags}`}
          />
          <input
            onClick={onSubmitBtnClick}
            className={styles.submitBtn}
            type="submit"
            value="수정하기"
          />
        </form>
      </div>
    </div>
  );
};

export default EditItem;
