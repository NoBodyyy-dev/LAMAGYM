import {useAppSelector} from "../../hooks/stateHooks";
import AuthorizedMain from "./AuthorizedMain";
import UnauthorizedMain from "./UnauthorizedMain";

const Main = () => {
    const {curUser} = useAppSelector(state => state.user);
    return curUser!._id ? <AuthorizedMain/> : <UnauthorizedMain/>
};

export default Main;