import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks.ts";
import { useEffect, useState } from "react";
import { getAllPostsFunc } from "../../store/actions/blogAction.ts";
import Post from "../../lib/post/Post.tsx";
import { UserData } from "../../store/types/userTypes.ts";
import api from "../../store/api.ts";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../lib/button/MainButton.tsx";

const UnauthorizedMain = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoadingPosts } = useAppSelector((state) => state.blog);
  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPostsFunc(1));
  }, [dispatch]);

  useEffect(() => {
    api.get("user/popular").then((data) => {
      setUsers(data.data.users);
    });
  }, [users.length]);

  return (
    <>
      <div className="main__container unauth">
        <div className="main__container__posts">
          <h1 className="title left">Лента новостей</h1>
          {isLoadingPosts
            ? "Загрузка..."
            : posts.length
            ? posts.map((post, index) => <Post postData={post} key={index} />)
            : "Пусто"}
        </div>
        <div className="main__container__users">
          <h1 className="title">Топ 3</h1>
          {users.map((user, index) => {
            return (
              <div className="user__top flex-align-center">
                <div
                  className={`user-rate flex-to-center txt-bold _${index + 1}`}
                >
                  {index + 1}
                </div>
                <Link
                  to={`profile/${user.username}`}
                  key={index}
                  className="user__card flex-to-center-col"
                >
                  <img
                    src={user.image}
                    alt={user.username}
                    className="user__card-image"
                  />
                  <p className="txt-bold user__card-username">
                    {user.username}
                  </p>
                  <p className="user__card-subs txt-gray">
                    {user.countSubscribers} подписчиков
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="say__container flex-to-center-col">
        <h1 className="title">
          Чтобы продолжить просмотр постов необходимо авторизоваться
        </h1>
        <MainButton onClick={() => navigate("/auth")}>
          Авторизоваться
        </MainButton>
      </div>
    </>
  );
};

export default UnauthorizedMain;
