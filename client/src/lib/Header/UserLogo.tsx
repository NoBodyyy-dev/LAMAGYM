import { useAppSelector } from "../../hooks/stateHooks";

function UserLogo() {
  const { curUser } = useAppSelector((state) => state.user);

  return (
    <>
      <img
        src={curUser?.username ? curUser.image : "/undefind-logo.png"}
        alt={curUser?.username}
        className="header__user-logo"
      />
      <p className="header__user-username">{curUser?.username}</p>
    </>
  );
}

export default UserLogo;
