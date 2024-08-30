import {memo} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import MainButton from "../button/MainButton.tsx";

type Props = {
    username: string
}

const PostBlocked = memo((props: Props) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="post__blocked">
            <h1 className="title txt-gray">У вас нет нужной подписки</h1>
            {location.pathname.split('/')[1] !== "profile"
                && <MainButton onClick={() => navigate(`profile/${props.username}`)}>Перейти для покупки</MainButton>}
        </div>
    );
});

export default PostBlocked;