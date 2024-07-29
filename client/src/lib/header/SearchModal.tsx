import {memo} from "react";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/stateHooks";
import {UserData} from "../../store/types/userTypes";

type Props = {
    users: UserData[];
    // setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchModal = memo((props: Props) => {
    const {isLoadingSearchUsers} = useAppSelector((state) => state.user);

    return (
        <div className="search__modal">
            {isLoadingSearchUsers ? (
                "Загрузка..."
            ) : props.users.length ? (
                props.users.map((user) => {
                    return (
                        <Link to={`/profile/${user.username}`} key={user._id}>
                            <div className="search__modal__user flex-align-center">
                                <img
                                    src={user.image}
                                    alt={user.username}
                                    className="search__modal__user-logo"
                                />
                                <p className="search__modal__user-username">{user.username}</p>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <p className="txt-empty">Пользователь не найден</p>
            )}
        </div>
    );
});

export default SearchModal;