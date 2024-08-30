import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/stateHooks";
import {Link, useNavigate} from "react-router-dom";
import BigModal from "../modals/BigModal";
import MainButton from "../button/MainButton";
import {logoutFunc} from "../../store/actions/userActions";

const Aside = () => {
    const dispatch = useAppDispatch();
    const {curUser} = useAppSelector((state) => state.user);
    const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
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
            link: `/chat`,
            name: "Чат",
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
                {links.map((link, index: number) => {
                    return (
                        <Link to={link.link} key={index}>
                            <div className="aside-link">{link.name}</div>
                        </Link>
                    );
                })}
                <div className="aside-link" onClick={() => setOpenLogoutModal(true)}>Выйти</div>
            </div>
            <BigModal modal={openLogoutModal} setModal={setOpenLogoutModal}>
                <div className="header__modal">
                    <h1 className="title">Вы уверены что хотите выйти из аккаунта?</h1>
                    <div className="buttons__block">
                        <MainButton className="buttons__block-item" onClick={() => setOpenLogoutModal(false)}>
                            Отмена
                        </MainButton>
                        <form className="buttons__block-item" onSubmit={() => {
                            setOpenLogoutModal(false)
                            logout()
                            console.log(openLogoutModal)
                        }}>
                            <MainButton>Выйти</MainButton>
                        </form>
                    </div>
                </div>
            </BigModal>
        </div>
    );
};

export default Aside;