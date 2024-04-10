import { useAppDispatch } from "../../../hooks/stateHooks";
import { Avatar, Card } from "antd";
import { getPostComments } from "../../../store/blog/BlogActions";
import { PostType } from "../../../store/blog/BlogTypes";
import { memo } from "react";

const ProfilePosts = memo((props: { posts: Array<PostType> }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="profile-posts">
      {props.posts.map((post) => {
        return (
          <Card
            className="profile-posts-post"
            key={post.id}
            title={post.title}
            extra={<a href="#">More</a>}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <p>{post.body}</p>
            {post.tags.map((tag) => {
              return <>{`${tag} +++ `}</>;
            })}
            {post.id}
            <p>
              👍 {post.reactions}{" "}
              <span
                className="comments-icon"
                onClick={() => dispatch(getPostComments(post.id))}
              >
                💬
              </span>
            </p>
            <hr />
            <div className="profile-comments">
              {post.comments?.map((comment) => {
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
          </Card>
        );
      })}
    </div>
  );
});

export default ProfilePosts;

// import React, { memo } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks";
// import { Card } from "antd";

// const ProfilePosts = memo(function ProfilePosts() {
//   const dispatch = useAppDispatch();
//   const { posts, isLoading } = useAppSelector((state) => state.blog);

//   return (
//     <div className="profile-posts">
//       {isLoading ? (
//         "...loading"
//       ) : (
//         <>
//           {posts.map((post) => {
//             return (
//               <Card
//                 className="profile-posts-post"
//                 key={post.id}
//                 title={post.title}
//                 extra={<a href="#">More</a>}
//                 cover={
//                   <img
//                     alt="example"
//                     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                   />
//                 }
//               >
//                 <p>{post.body}</p>
//                 {post.tags.map((tag) => {
//                   return <>{`${tag} +++ `}</>;
//                 })}
//                 {post.id}
//                 <p>
//                   👍 {post.reactions} <span className="comments-icon">💬</span>
//                 </p>
//                 <hr />
//                 <div className="profile-comments">
//                   {/* {post.comments.map((comment) => {
//                         return <>{comment.body}</>
//                       })} */}
//                 </div>
//               </Card>
//             );
//           })}
//         </>
//       )}
//     </div>
//   );
// });

// export default ProfilePosts;
