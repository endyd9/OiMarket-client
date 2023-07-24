import { useEffect, useState } from "react";
import styles from "../css/Messages.module.css";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import cookie from "react-cookies";
import { rootUrl } from "..";

const Messages = () => {
  //채팅방 리스트
  const [chatList, setChatList] = useState([]);

  //채팅방 생성
  const { id, id2, itemid } = useParams();

  const crateRoom = async () => {
    //id2나 itemid가 없으면 요청 안하기
    if (id2 === undefined || itemid === undefined) {
      return;
    }
    const response = await fetch(`${rootUrl}/message/${id}`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        id2,
        itemid,
      }),
    });
    loadRooms();
  };

  //채팅방 목록 불러오기
  const loadRooms = async () => {
    const response = await fetch(`${rootUrl}/message/${id}`);
    if (response.status === 200) {
      await response.json().then((data) => {
        setChatList(data.user.chat);
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    crateRoom();
    loadRooms();
  }, []);

  const [chatLog, setChatLog] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [roomTitle, setRoomTitle] = useState("");

  const [chatStart, setChatStart] = useState(false);
  const [ws, setWs] = useState();

  //채팅방 입장
  const openChatRoom = (event) => {
    setRoomTitle(event.target.innerText.replace("에 대한 대화", ""));
    chatList.forEach((room) => {
      const chatLogArr = [];
      if (room._id === event.target.id) {
        setRoomId(room._id);
        if (room.messages !== undefined) {
          room.messages.forEach((id) => {
            if (id[0] === cookie.load("loggedInUser")) {
              chatLogArr.push(`나 : ${id[1]}`);
            } else {
              chatLogArr.push(`상대 : ${id[1]}`);
            }
            setChatLog([...chatLogArr]);
          });
        } else {
          setChatLog([]);
        }
      }
    });
    setChatStart(true);
  };

  //메세지 보내기
  const sendMessage = () => {
    const message = document.getElementById("message");
    if (message.value === "") {
      return;
    }
    setChatLog((prev) => [...prev, `나 : ${message.value}`]);
    ws.emit("send_message", { message: message.value });
    setTimeout(() => (message.value = ""), 10);
  };
  //화면에 메세지 그려주기
  const writeMessage = (msg) => {
    setChatLog((prev) => [...prev, `상대 : ${msg}`]);
  };

  //채팅방 닫을때
  const closeChatRoom = () => {
    setChatStart(false);
    setChatLog([]);
    setRoomTitle("");
    ws.disconnect();
  };

  //채팅이 시작되면 소켓 접속
  useEffect(() => {
    if (chatStart) {
      setWs(
        io.connect(
          `${rootUrl}?userName=${cookie.load("userName")}&&userId=${cookie.load(
            "loggedInUser"
          )}&&roomId=${roomId}`
        )
      );
    }
  }, [chatStart]);

  //메세지 돌려받기
  useEffect(() => {
    ws?.on("receive_message", (msg) => {
      writeMessage(msg);
    });
  }, [ws]);

  //채팅창 스크롤 최하단으로
  useEffect(() => {
    const chatDiv = document.getElementById("Chatlog");
    chatDiv?.scrollTo(999, 999);
  }, [chatLog]);

  return (
    <div className={styles.Message}>
      <h1 className={styles.title}>메세지</h1>
      <div className={styles.messageForm}>
        <br />
        <h2>{roomTitle === "" ? "메세지 목록" : roomTitle}</h2>
        <ul className={styles.chatList}>
          {chatStart ? (
            <li className={styles.room}>
              <h2 onClick={closeChatRoom} className={styles.out}>
                ❌
              </h2>
              <div id="Chatlog" className={styles.chatlog}>
                <ul className={styles.messages}>
                  {chatLog?.map((message, index) => (
                    <li className={styles.message} key={index}>
                      {message}
                    </li>
                  ))}
                </ul>
              </div>
              <input
                onKeyPress={(event) =>
                  event.key === "Enter" ? sendMessage() : null
                }
                className={styles.sendMessage}
                type="text"
                id="message"
              />
              <button onClick={sendMessage} className={styles.sendBtn}>
                보내기
              </button>
            </li>
          ) : chatList?.length > 0 ? (
            chatList.map((room) => (
              <li
                onClick={openChatRoom}
                key={room._id}
                id={room._id}
                className={styles.rooms}
              >
                {room.item.title}에 대한 대화
              </li>
            ))
          ) : (
            <div>
              <h1 className={styles.noChat}>아무고토 없어여</h1>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Messages;
