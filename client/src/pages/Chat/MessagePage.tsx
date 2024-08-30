import { useNavigate, useParams } from "react-router-dom";
import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "../../hooks/stateHooks.ts";
import { useFormatedTime } from "../../hooks/utilsHooks.ts";
import MainTextarea from "../../lib/inputs/MainTextarea.tsx";
import MainButton from "../../lib/button/MainButton.tsx";

const MessagePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { curUser, onlineUsers, socketConnection } = useAppSelector(
    (state) => state.user
  );
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [messageData, setMessageData] = useState<string>("");
  const targetElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", userId);
      socketConnection.on("message-user", (data) => {
        setChatUser(data);
      });
      socketConnection.on("message", (data: SetStateAction<never[]>) => {
        setMessages(data);
        // const sound = new Audio("/send-sound.mp3")
        // sound.play()
      });
    }
  }, [socketConnection]);

  useEffect(() => {
    if (targetElementRef.current) {
      targetElementRef.current.scrollIntoView({
        behavior: "instant",
      });
    }
  }, [messages.length]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageData) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          senderId: curUser?._id,
          receiverId: userId,
          text: messageData,
        });
      }
      setMessageData("");
    } else return;
  };

  return (
    <div className="messages border-gray">
      <div className="messages__user">
        <p
          className="messages__user-back txt-prpl"
          onClick={() => navigate("/chat")}
        >
          {"<"} Назад
        </p>
        <div className="messages__user__data flex-align-center">
          <div className="block-image">
            <img
              src={chatUser.image}
              alt=""
              className="messages__user__data-image"
            />
            {onlineUsers.includes(chatUser._id) && (
              <div className="block-image-online"></div>
            )}
          </div>
          <div className="message__user__data-text">
            <p
              onClick={() => navigate(`/profile/${chatUser.username}`)}
              className="messages__user__data-username"
            >
              {chatUser.username}
            </p>
            <p
              className={`messages__user__data-online ${
                onlineUsers.includes(chatUser._id) && "txt-prpl"
              }`}
            >
              {onlineUsers.includes(chatUser._id) ? "в сети" : "не в сети"}
            </p>
          </div>
        </div>
      </div>

      <div className="messages__container">
        <div className="messages__container__scroll">
          {messages.length ? (
            messages.map((msg, index) => {
              return (
                <div
                  className={`messages__block ${
                    msg.senderId === curUser?._id ? "cur--user" : "chat--user"
                  }`}
                  key={index}
                >
                  <div className="messages__block-text">{msg.text}</div>
                  {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                  <div className="messages__block-time">
                    {useFormatedTime(msg.createdAt)}
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="title txt-gray">Начните общаться!</h1>
          )}
          <div className="ref" ref={targetElementRef}></div>
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        onClick={(e) => {
          console.log(e);
        }}
        className="messages__field flex"
      >
        <MainTextarea
          value={messageData}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setMessageData(e.target.value)
          }
        />
        <MainButton className="messages__field-send">Отправить</MainButton>
      </form>
    </div>
  );
};

export default MessagePage;
