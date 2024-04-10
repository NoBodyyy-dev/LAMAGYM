import { useEffect, useState } from "react";

import SkeletonImage from "antd/es/skeleton/Image";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks";
import { decrement, increment } from "../../store/feed/feedSlice";
import PostsView from "../../lib/Posts/PostsView";
import { getFeedPosts } from "../../store/feed/feedActions";

const AuthUserMain = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoadingFeed } = useAppSelector((state) => state.feed);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      150
    )
      setPage(page + 1);
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    dispatch(getFeedPosts(page));
  }, [page])

  return (
    <div className="main__container">
      {/* <button onClick={() => dispatch(decrement())}>{"<"}</button> */}
      {/* {page} */}
      {/* <button onClick={() => dispatch(increment())}>{">"}</button> */}
      {isLoadingFeed ? <SkeletonImage /> : <PostsView posts={posts} />}
    </div>
  );
};

export default AuthUserMain;
