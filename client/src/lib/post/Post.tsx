import { PostType } from "../../store/types/blogTypes";
import PostHeader from "./PostHeader.tsx";
import PostBody from "./PostBody.tsx";
import PostIcons from "./PostIcons.tsx";
import { UserData } from "../../store/types/userTypes.ts";
import { memo, useEffect } from "react";
import { useAppSelector } from "../../hooks/stateHooks.ts";
import PostBlocked from "./PostBlocked.tsx";

type Props = {
  postData: PostType;
  curUser?: UserData;
};

const Post = memo((props: Props) => {
  const { curUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(props.postData);
    
  }, [])

  return (
    <div className="post">
      <PostHeader
        username={props.postData.userName}
        image={props.postData.user.image}
        createdAt={props.postData.createdAt}
        id={props.postData.user._id}
        subs={props.curUser?.subsOnUsers}
        curSub={props.postData.subId}
      />
      {curUser!._id === props.postData.user._id ? (
        <>
          <PostBody
            image={props.postData.image}
            body={props.postData.body}
            tags={props.postData.tags}
          />
          <PostIcons
            _id={props.postData._id}
            countLikes={props.postData.countLikes}
          />
        </>
      ) : props.postData.subId === null ||
        curUser?.purchasedSubs?.includes(props.postData.subId._id) ? (
        <>
          <PostBody
            image={props.postData.image}
            body={props.postData.body}
            tags={props.postData.tags}
          />
          <PostIcons
            _id={props.postData._id}
            countLikes={props.postData.countLikes}
          />
        </>
      ) : (
        <PostBlocked username={props.postData.userName} />
      )}
    </div>
  );
});

export default Post;
