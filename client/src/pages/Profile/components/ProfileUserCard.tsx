import { memo } from "react";
import MainButton from "../../../lib/Buttons/MainButton";
import { USER_DATA } from "../../../store/users/USER_TYPES";
import undefindLogo from "../../../../public/undefind-logo.png";

type Props = {
  curUser?: USER_DATA;
  profileUser: USER_DATA;
};

const ProfileUserCard = memo((props: Props) => {
  return (
    <div className="profile__user flex-to-center">
      <div className="profile__user__block flex-to-center-col">
        <img
          src={props.profileUser.image ? props.profileUser.image : undefindLogo}
          alt={props.profileUser.username}
          className="profile__user-logo"
        />
        <div className="profile__user__block__info flex-to-center-col">
          <h1 className="profile__user-name">{props.profileUser.username}</h1>
          {props.curUser?.id === props.profileUser.id ? (
            <MainButton>Редактировать</MainButton>
          ) : (
            <p className="profile__user-moreInfo">Подробнее</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProfileUserCard;
