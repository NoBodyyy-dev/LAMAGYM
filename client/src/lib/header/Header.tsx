import {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/stateHooks.ts";
import {useSearchUsers} from "../../hooks/fieldHooks.ts";
import {getAllUsersFunc} from "../../store/actions/userActions.ts";
import SearchModal from "./SearchModal.tsx";
import MainInput from "../inputs/MainInput.tsx";
import UserLogo from "./UserLogo.tsx";
import MainButton from "../button/MainButton.tsx";

const Header = () => {
    const dispatch = useAppDispatch();
    const {curUser, allUsers} = useAppSelector((state) => state.user);
    const [search, setSearch] = useState({query: ""});
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const searchUsers = useSearchUsers(allUsers, search);

    const openModalFunc = () => {
        setOpenSearchModal(true);
        if (!allUsers.length) dispatch(getAllUsersFunc());
    };

    return (
        <header className="header">
            <div className="header__container flex-align-center-sbetw">
                <Link to="/"><div className="header-logo"></div></Link>
                <div className="header__search">
                    <MainInput
                        placeholder="Поиск..."
                        value={search.query}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSearch({query: e.target.value})
                        }
                        onFocus={() => openModalFunc()}
                        onBlur={() =>
                            setTimeout(() => {
                                setOpenSearchModal(false);
                                setSearch({query: ""});
                            }, 140)
                        }
                    />
                    {openSearchModal && (
                        <SearchModal query={search.query} users={searchUsers}/>
                    )}
                </div>

                <div className="header__user flex-align-center">
                    {curUser?._id ? <UserLogo/> : <Link to={"/auth"}>
                        <MainButton>Войти</MainButton>
                    </Link>}
                </div>
            </div>
        </header>
    );
};

export default Header;