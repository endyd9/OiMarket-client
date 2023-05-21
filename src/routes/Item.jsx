import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/Item.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";

const Item = () => {
  const [item, setItem] = useState({});
  const [owner, setOwner] = useState({});
  const [imgUrl, setImgUrl] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState();

  const { id } = useParams();

  const getItem = async () => {
    const response = fetch(`http://localhost:4000/item/api/${id}`, {
      method: "get",
    });
    if ((await response).status === 200) {
      (await response).json().then((data) => {
        setItem(data.item);
        console.log(data.item.hashtags.length);
        setImgUrl([...data.item.imgUrl]);
        setOwner(data.item.owner);
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getItem();
  }, []);

  //slick 관련 설정
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

  return (
    <div className={styles.Item}>
      <h1 className={styles.title}>{item.title}</h1>
      <h2 className={styles.owner}>판매자 | {owner.name}</h2>
      <h2>상태 | {item.status ? "판매완료" : "판매중"}</h2>
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
          {item.hashtags == "" ? "태그가 없넹" : item.hashtags}
        </div>
      </div>
    </div>
  );
};

export default Item;
