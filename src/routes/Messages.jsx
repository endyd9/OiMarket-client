import { useEffect, useState } from "react";
import styles from "../css/Messages.module.css";
import io from "socket.io-client";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Messages = () => {
  const [chatList, setChatList] = useState([]);

  //채팅방 생성 이미 있는방이면 안만들어짐
  const { id, id2, itemid } = useParams();

  const crateRoom = async () => {
    if (id2 === undefined || itemid === undefined) {
      return;
    }
    const response = await fetch(
      `http://localhost:4000/message/api/createRoom`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          id2,
          itemid,
        }),
      }
    );
  };

  //채팅방 불러오기
  const loadRooms = async () => {
    const response = await fetch(
      `http://localhost:4000/message/api/rooms/${id}`
    );
    if (response.status === 200) {
      await response.json().then((data) => {
        console.log(data);
      });
    }
  };

  useEffect(() => {
    crateRoom();
    loadRooms();
  }, []);

  const [users, setUsers] = useState([]);
  const [chatLog, setChatlog] = useState([]);

  const [chatStart, setChatStart] = useState(false);
  const [ws, setWs] = useState();

  const sendMessage = async () => {
    const message = document.getElementById("message");
    if (message.value === "") {
      return;
    }
    ws.emit("send_message", { message: message.value });
    message.value = "";
  };
  const writeMessage = (msg) => {
    setChatlog((prev) => [...prev, msg]);
  };

  useEffect(() => {
    if (chatStart) {
      setWs(io.connect("http://localhost:4000/"));
    }
  }, [chatStart]);

  useEffect(() => {
    ws?.on("receive_message", (msg) => {
      writeMessage(msg);
    });
  }, [ws]);

  return (
    <div className={styles.Message}>
      <h1 className={styles.title}>소켓 함 가보자</h1>
      <div className={styles.messageForm}>
        <br />
        <h2>메세지 목록</h2>
        <ul className={styles.chatList}>
          {chatStart ? (
            <li className={styles.room}>
              <h2 onClick={() => setChatStart(false)} className={styles.out}>
                ❌
              </h2>
              <div>
                <ul className={styles.messages}>
                  {chatLog?.map((message, index) => (
                    <li key={index}>{message}</li>
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
          ) : chatList.length > 0 ? (
            chatList.map((room) => (
              <li
                onClick={() => setChatStart(true)}
                key={room.id}
                className={styles.rooms}
              >
                채팅방
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
