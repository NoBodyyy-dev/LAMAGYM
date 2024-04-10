import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks";
import { Link, useNavigate } from "react-router-dom";
import BigModal from "../Modals/BigModal";
import MainButton from "../Buttons/MainButton";
import { logoutFunc } from "../../store/users/userSlice";

const Aside = () => {
  const dispatch = useAppDispatch();
  const { curUser } = useAppSelector((state) => state.user);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate();

  const links: Array<{ link: string; name: string }> = [
    {
      link: "/",
      name: "Главная",
    },
    {
      link: `/profile/${curUser!.username}`,
      name: "Профиль",
    },
    {
      link: `/messenger`,
      name: "Сообщения",
    },
  ];

  const logout = () => {
    dispatch(logoutFunc());
    setOpenLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="aside">
      <div className="aside__container">
        {links.map((link) => {
          return (
            <Link to={link.link}>
              <div className="aside-link">{link.name}</div>
            </Link>
          );
        })}
        <div className="aside-link" onClick={() => setOpenLogoutModal(true)}>Logout</div>
      </div>
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
    </div>
  );
};

export default Aside;
