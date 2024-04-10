import { PostType } from "../../store/blog/BlogTypes";
import Post from "./Post";
import styles from "./Post.module.scss";

type Props = {
  posts: PostType[];
};

const PostsView = (props: Props) => {
  return (
    <div className={[styles.posts, "flex-to-center-col"].join(" ")}>
      {props.posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
};

export default PostsView;
