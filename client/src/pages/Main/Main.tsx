import { useAppSelector } from "../../hooks/stateHooks";
import AuthUserMain from "./AuthUserMain";
import NotAuthUserMain from "./NotAuthUserMain";

function Main() {
  const { curUser } = useAppSelector((state) => state.user);
  return <>{curUser!.id ? <AuthUserMain /> : <NotAuthUserMain />}</>;
}

export default Main;
