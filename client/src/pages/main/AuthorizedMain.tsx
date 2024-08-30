import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks.ts";
import { useEffect, useState } from "react";
import { getAllPostsFunc } from "../../store/actions/blogAction.ts";

import Post from "../../lib/post/Post.tsx";
import api from "../../store/api.ts";
import { PostType } from "../../store/types/blogTypes.ts";

const AuthorizedMain = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoadingPosts } = useAppSelector((state) => state.blog);
  const { curUser } = useAppSelector((state) => state.user);

  const [page, setPage] = useState(2);
  const [arrPosts, setArrPosts] = useState<PostType[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    console.log(arrPosts);
  }, [arrPosts.length]);

  useEffect(() => {
    if (fetching && arrPosts.length % 10 === 0) {
      api
        .get(`post/all/${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((data) => {
          setArrPosts([...arrPosts, ...data.data.posts]);
          console.log(data);
        })
        .finally(() => {
          setFetching(false);
          setPage((prev) => prev + 1);
        });
    }
  }, [fetching, arrPosts.length]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    dispatch(getAllPostsFunc(1));    
    setArrPosts([...posts]);
  }, [posts.length]);

  return (
    <div className="main__container">
      {isLoadingPosts ? (
        "Загрузка"
      ) : posts.length ? (
        arrPosts.map((post, index) => {
          return <Post curUser={curUser} postData={post} key={index} />;
        })
      ) : (
        <p>Пусто</p>
      )}
    </div>
  );
};

export default AuthorizedMain;
