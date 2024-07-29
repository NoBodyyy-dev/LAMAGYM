import {useAppDispatch, useAppSelector} from "../../hooks/stateHooks.ts";
import {useEffect, useState} from "react";
import {getAllPostsFunc} from "../../store/actions/blogAction.ts";

const UnauthorizedMain = () => {
    const dispatch = useAppDispatch();
    const {posts} = useAppSelector((state) => state.blog)
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllPostsFunc(page))
    }, [page]);

    return (
        <div className="main__container">
            {posts.map((post, index) => {
                return <div key={index}>{post.body}</div>;
            })}
        </div>
    );
};

export default UnauthorizedMain;