import { Avatar } from "antd";
import { useAppDispatch } from "../../hooks/stateHooks";
import { getPostComments } from "../../store/blog/BlogActions";
import { PostType, commentType } from "../../store/blog/BlogTypes";
import styles from "./Post.module.scss";

const Post = (props: { post: PostType }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.postsItem} key={props.post!.id}>
      <img
        src={
          "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        }
        alt={props.post.title}
      />
      <p className={styles.postText}>{props.post.body}</p>
      {props.post.tags.map((tag: string) => {
        return <>{`#${tag} `}<br /></>;
      })}
      {props.post.id}
      <p>
        👍 {props.post.reactions}{" "}
        <span
          className="comments-icon"
          onClick={() => dispatch(getPostComments(props.post.id))}
        >
          💬
        </span>
      </p>
      <hr />
      <div className="profile-comments">
        {props.post.comments?.map((comment: commentType) => {
          return (
            <div className="comment" key={comment.id}>
              <p>
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                {comment.user.username}
              </p>
              <p className="comment-body">{comment.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
