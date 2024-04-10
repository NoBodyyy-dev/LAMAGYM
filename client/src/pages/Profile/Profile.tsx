import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks";

import "../../styles/profile.scss";
import { getSubs, getUserProfile } from "../../store/blog/BlogActions";
import ProfilePosts from "./components/ProfilePosts";
import ProfileUserCard from "./components/ProfileUserCard";
import Subscription from "./components/Subscription";
import AddPost from "./components/AddPost";

function Profile() {
  const { profileId } = useParams();
  const dispatch = useAppDispatch();
  const { curUser } = useAppSelector((state) => state.user);
  const { profileUser, posts, isLoading, subs } = useAppSelector(
    (state) => state.blog
  );

  useEffect(() => {
    document.title = profileId!;

    dispatch(getUserProfile(profileId!));
    dispatch(getSubs(profileUser.id!));
  }, [profileId]);

  return (
    <div className="profile">
      <div className="background"></div>
      <div className="profile__container">
        <ProfileUserCard curUser={curUser} profileUser={profileUser} />
        {profileUser.id === curUser?.id && <AddPost />}
        <div className="profile__activity">
          <div className="profile__activity__block subs">
            {subs.map((item: any) => (
              <Subscription key={item.userId} sub={item} />
            ))}
          </div>
          <div className="profile__activity__block posts">
            {isLoading ? "loading..." : <ProfilePosts posts={posts} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
