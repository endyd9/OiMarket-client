import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import styles from "../css/Item.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import { rootUrl } from "..";

const Item = () => {
  const [item, setItem] = useState({});
  const [owner, setOwner] = useState({});
  const [imgUrl, setImgUrl] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState();

  const { id } = useParams();

  const nav = useNavigate();

  //상품 정보 요청
  const getItem = async () => {
    const response = fetch(`${rootUrl}/item/${id}`);
    if ((await response).status === 200) {
      (await response).json().then(async (data) => {
        setItem(data.item);
        setImgUrl([...data.item.imgUrl]);
        setOwner(data.item.owner);
      });
    }
  };

  //상품 상태 변경
  const ChangeStatus = async () => {
    if (item.owner._id === cookie.load("loggedInUser")) {
      if (window.confirm("상품 상태를 변경하시겠습니까?")) {
        const response = await fetch(`${rootUrl}/item/${id}/`, {
          method: "put",
        });
        if (response.status === 201) {
          alert("변경완료");
          window.scrollTo(0, 0);
          window.location.reload();
        } else {
          alert("변경실패 다시시도하세용");
        }
      }
    }
  };

  //상품 삭제
  const DeleteItem = async () => {
    if (item.owner._id === cookie.load("loggedInUser")) {
      if (window.confirm("삭제하시겠습니까?")) {
        const response = await fetch(`${rootUrl}/item/${id}`, {
          method: "delete",
        });
        if (response.status === 201) {
          alert("삭제되었습니다");
          return nav("/");
        } else {
          return alert("삭제 실패");
        }
      } else {
        return alert("삭제취소");
      }
    }
    alert("권한 없음!");
    nav("/");
  };

  //react-slick 관련 설정
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: 10 }}
        onClick={onClick}
      />
    );
  }
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: 10, zIndex: 1 }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    infinite: true,
    speed: 1000,
    arrows: true,
    // autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    vertical: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: true,
    centerMode: true,
    centerPadding: "1px",
  };

  //모달 파트
  const onImgClick = (event) => {
    if (modal) {
      setModal(false);
    } else {
      setModalImg(event.target.src);
      setModal(true);
    }
  };
  Modal.setAppElement("#root");

  useEffect(() => {
    if (item?.owner?._id === undefined) return;
    if (owner._id !== cookie.load("loggedInUser")) {
      fetch(`${rootUrl}/item/${id}/count`, {
        method: "PATCH",
      });
    }
  }, [owner]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getItem();
  }, []);

  return (
    <div className={styles.Item}>
      <h1 className={styles.title}>{item.title}</h1>
      <Link to={`/user/${owner._id}`}>
        <h2 className={styles.owner}>판매자 | {owner.name}</h2>
      </Link>
      <h2>
        상태 |{" "}
        <span style={{ fontSize: 23, color: item.status ? "red" : "blue" }}>
          {item.status ? "판매완료" : "판매중"}
        </span>
      </h2>
      <div className={styles.iteminfo}>
        <div className={styles.sliderContanier}>
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
            <img
              className={styles.modalImg}
              src={modalImg}
              onClick={onImgClick}
            />
          </Modal>
          <Slider {...settings} className={styles.slider}>
            {item === {}
              ? null
              : imgUrl.map((url, index) => (
                  <div key={index} className={styles.imgs}>
                    <img
                      className={styles.img}
                      src={`http://localhost:4000/${url}`}
                      onClick={onImgClick}
                    />
                  </div>
                ))}
          </Slider>
        </div>
        <div className={styles.description}>
          {item.description === "" ? (
            <p className={styles.noDescript}>
              <br />
              <br />
              설명이 없슴둥
            </p>
          ) : (
            <p>{item.description}</p>
          )}
        </div>
        <div className={styles.tag}>
          {item.hashtags == ""
            ? "태그가 없넹"
            : item.hashtags?.length > 1
            ? item.hashtags.map((tag) => `${tag}, `)
            : item.hashtags}
        </div>
        <div className={styles.btns}>
          {item.owner?._id === cookie.load("loggedInUser") ? (
            <div className={styles.ownerBtns}>
              <Link to={`/item/${item?._id}/edit`}>
                <button className={styles.obtn}>상품 수정</button>
              </Link>
              <button onClick={ChangeStatus} className={styles.obtn}>
                핀매상태 변경
              </button>
              <button onClick={DeleteItem} className={styles.obtn}>
                상품 삭제
              </button>
            </div>
          ) : (
            // <button onClick={() => alert("공사중")} className={styles.btn}>
            //   메세지 보내기
            // </button>
            <Link
              to={`/user/${cookie.load("loggedInUser")}/message/${
                owner._id
              }/${id}`}
            >
              <button className={styles.btn}>메세지 보내기</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
