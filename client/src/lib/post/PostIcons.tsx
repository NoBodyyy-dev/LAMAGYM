import { CommentType } from "../../store/types/blogTypes.ts";
import { useEffect, useState, memo } from "react";
import api from "../../store/api.ts";
import MainTextarea from "../inputs/MainTextarea.tsx";
import SmallButton from "../button/SmallButton.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks.ts";
import { createCommentFunc } from "../../store/actions/blogAction.ts";

type Props = {
  countLikes: number;
  _id: string;
};

const PostIcons = memo((props: Props) => {
  const dispatch = useAppDispatch();
  const { curUser } = useAppSelector((state) => state.user);

  const [comments, setComments] = useState<CommentType[]>([]);
  const [like, setLike] = useState<number>(props.countLikes);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isOpenComments, setIsOpenComments] = useState<boolean>(false);

  const [text, setText] = useState<string>("");

  const addComment = () => {
    if (text.length) {
      api
        .post(
          `comment/createComment/${props._id}`,
          { text: text },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((data) => {
          console.log(data);
          setComments([...comments, data.data.comment]);
          setText("");
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    if (curUser?.likedPosts?.includes(props._id)) {
      setIsLike(true);
      console.log(curUser?.likedPosts.includes(props._id));
    }
  }, [curUser?.likedPosts?.length]);

  useEffect(() => {
    console.log(isLike);
  }, [isLike]);

  useEffect(() => {
    api
      .get(`comment/getPostComment/${props._id}`)
      .then((data) => {
        setComments(data.data.comments);
      })
      .catch((e) => console.log(e));
  }, [comments.length]);

  const likePost = async (postId: string) => {
    api
      .post(
        "post/like",
        { postId: postId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((data) => {
        console.log(">>>", data.data);
        setLike(data.data.postCount);
        setIsLike(true);
      })
      .catch((e) => console.log(e));
  };

  const unlikePost = async (postId: string) => {
    api
      .post(
        "post/unlike",
        { postId: postId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((data) => {
        console.log("---", data.data);
        setLike(data.data.postCount);
        setIsLike(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="post__icons flex">
        {curUser?._id ? (
          isLike ? (
            <div
              className={`post__icons-likes flex liked`}
              onClick={() => {
                unlikePost(props._id);
              }}
            >
              <div></div> <span>{like}</span>
            </div>
          ) : (
            <div
              className={`post__icons-likes flex unliked`}
              onClick={() => {
                likePost(props._id);
              }}
            >
              <div></div> <span>{like}</span>
            </div>
          )
        ) : (
          <div className={`post__icons-likes flex unliked`}>
            <div></div> <span>{like}</span>
          </div>
        )}
        <div
          className="post__icons-comments flex"
          onClick={() => setIsOpenComments((s) => !s)}
        >
          <div></div> <span>{comments.length}</span>
        </div>
      </div>
      <div className="post__comment">
        {curUser?._id && (
          <div className="flex">
            <MainTextarea
              value={text}
              placeholder="Написать комментарий"
              onChange={(e) => setText(e.target.value)}
            />
            <SmallButton
              className="add"
              onClick={() => {
                addComment();
                setText("");
              }}
            />
          </div>
        )}
        {isOpenComments && (
          <div className="post__comments">
            {comments.map((comment: CommentType, index: number) => {
              return (
                <div
                  className="post__comments__box flex-align-center"
                  key={index}
                >
                  <div className="post__comments__box__user flex-align-center">
                    <img
                      src={comment.user.image}
                      alt={comment.user.username}
                      className="post__comments__box__user-logo"
                    />
                  </div>
                  <div className="haha">
                    <span className="post__comments__box__user-username txt-bold">
                      {comment.user.username}
                    </span>
                    <div className="post__comments__box-body">
                      {comment.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
});

export default PostIcons;
