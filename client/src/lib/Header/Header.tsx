import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks";
import MainInput from "../Inputs/MainInput";
import UserLogo from "./UserLogo";

import { logoutFunc } from "../../store/users/userSlice";
import MainButton from "../Buttons/MainButton";
import { useState } from "react";
import SearchModal from "./SearchModal";
import { getAllUsersFunc } from "../../store/users/userActions";
import { useSearchUsers } from "../../hooks/searchHooks";
import BigModal from "../Modals/BigModal";

function Header() {
  const dispatch = useAppDispatch();
  const { curUser, allUsers } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [search, setSearch] = useState({ query: "" });
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const searchUsers = useSearchUsers(allUsers, search);

  const openModalFunc = () => {
    setOpenSearchModal(true);
    if (!allUsers.length) dispatch(getAllUsersFunc());
  };

  const logout = () => {
    dispatch(logoutFunc());
    setOpenLogoutModal(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__container flex-align-center-sbetw">
        <Link to="/">
          <div className="header-logo"></div>
        </Link>
        <div className="header__search">
          <MainInput
            placeholder="Поиск..."
            value={search.query}
            onChange={(e: { target: { value: string } }) =>
              setSearch({ query: e.target.value })
            }
            onFocus={() => openModalFunc()}
            onBlur={() =>
              setTimeout(() => {
                setOpenSearchModal(false);
                setSearch({ query: "" });
              }, 100)
            }
          />
          {openSearchModal && (
            <SearchModal
              setOpenModal={setOpenSearchModal}
              users={searchUsers}
            />
          )}
        </div>

        <div className="header__user flex-align-center">
          <UserLogo />
        </div>
      </div>
      {curUser?.id && (
        <BigModal modal={openLogoutModal} setModal={setOpenLogoutModal}>
          <div className="header__modal">
            <h1 className="title">Вы уверены что хотите выйти из аккаунта?</h1>
            <div className="buttons__block">
              <MainButton onClick={() => setOpenLogoutModal(false)}>
                Отмена
              </MainButton>
              <MainButton onClick={() => logout()}>Выйти</MainButton>
            </div>
          </div>
        </BigModal>
      )}
    </header>
  );
}

export default Header;
