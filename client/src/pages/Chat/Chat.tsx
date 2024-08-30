import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/stateHooks.ts";
import { ChatRoom } from "../../store/types/chatTypes.ts";
import { Link } from "react-router-dom";
import { useFormaterDate } from "../../hooks/utilsHooks.ts";

const Chat = () => {
  const { curUser, socketConnection, onlineUsers } = useAppSelector(
    (state) => state.user
  );

  const [chatRoom, setChatRoom] = useState([]);
  const getReceiver = (arr: any[]) =>
    arr.filter((p) => p._id !== curUser!._id)[0];

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", curUser!._id);
      socketConnection.on("chatRoom", (data) => {
        setChatRoom(data);
      });
    }
  }, [socketConnection]);

  return (
    <div className="chat">
      <div className="chat__users">
        {chatRoom.length ? (
          chatRoom.map((chat: ChatRoom, index) => {
            const c = getReceiver(chat.participants);

            return (
              <Link
                to={`/chat/${c._id}`}
                className="chat__users__block flex-align-center border-gray"
                key={index}
              >
                <div className="block-image">
                  <img
                    src={c.image}
                    alt={c.username}
                    className="chat__users__block-image"
                  />
                  {onlineUsers.includes(c._id) && <div className="block-image-online"></div>}
                </div>
                <div className="chat__users__block__text">
                  <div className="chat__users__block__text-username">
                    {c.username}
                  </div>
                  {chat.lastMsg && (
                    <div className="chat__users__block__text-last-msg txt-gray">
                      {`${chat.lastMsg.senderId === curUser!._id ? "Вы:" : ""}
                                    ${chat.lastMsg.text}`}
                    </div>
                  )}
                </div>
                {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                {chat.lastMsg && (
                  <div className="chat__users__block-time">
                    {useFormaterDate(chat.lastMsg.createdAt)}
                  </div>
                )}
              </Link>
            );
          })
        ) : (
          <h1 className="title txt-gray">Нет диалогов</h1>
        )}
      </div>
    </div>
  );
};

export default Chat;
