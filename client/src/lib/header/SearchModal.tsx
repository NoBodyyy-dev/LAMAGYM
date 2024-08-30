import {memo} from "react";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/stateHooks";
import {UserData} from "../../store/types/userTypes";

type Props = {
    users: UserData[];
    query: string
};

const SearchModal = memo((props: Props) => {
    const {isLoadingSearchUsers} = useAppSelector((state) => state.user);

    return (
        <nav className="search__modal">
            {isLoadingSearchUsers ? (
                "Загрузка..."
            ) : props.users.length ? (
                props.users.map((user, index) => {
                    return (
                        <Link to={`/profile/${user.username}`} key={index}>
                            <div className="search__modal__user flex-align-center">
                                <img
                                    src={user.image}
                                    alt={user.username}
                                    className="search__modal__user-logo"
                                />
                                <p className="search__modal__user-username">
                                    <span className="txt-bold txt-prpl">
                                    {user.username?.slice(0, props.query.length)}
                                    </span>
                                    {user.username?.slice(props.query.length)}
                                </p>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <p className="txt-empty">Пользователь не найден</p>
            )}
        </nav>
    );
});

export default SearchModal;