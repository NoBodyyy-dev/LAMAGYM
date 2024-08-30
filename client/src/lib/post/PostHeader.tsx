import {useFormaterDate} from "../../hooks/utilsHooks.ts";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetSubType} from "../../store/types/subTypes.ts";

type Props = {
    username: string,
    image: string,
    createdAt: string,
    id: string,
    subs?: string[],
    curSub?: GetSubType
}

const PostHeader = (props: Props) => {
    const location = useLocation();
    const [subClass, setSubClass] = useState<string>("")

    useEffect(() => {
        props.subs?.length && (props.subs.includes(props.id) && setSubClass("txt-prpl"))
    }, [props.subs?.length]);

    return (
        <div className="post__header flex-align-start-sbetw">
            <div className="post__header__block flex-align-center-sbetw">
                <div className="block flex-align-center">
                    <img className="post__header-logo" alt={props.username} src={props.image}/>
                    <div className="post__header__info">
                        <p>
                            {location.pathname.split("/")[1] === "profile"
                                ? props.username
                                : <Link className={subClass} to={`profile/${props.username}`}>{props.username}</Link>
                            }
                        </p>
                        <p className="txt-gray">{useFormaterDate(props.createdAt)}</p>
                    </div>
                </div>
                <div className="block">
                    {props.curSub !== null
                        && (<>Подписка: <span className="txt-prpl">{props.curSub?.title}</span></>)}
                </div>
            </div>
        </div>
    );
};

export default PostHeader;