import {useAppDispatch, useAppSelector} from "../../hooks/stateHooks.ts";
import {useEffect, useState} from "react";
import {getAllPostsFunc} from "../../store/actions/blogAction.ts";

import Post from "../../lib/post/Post.tsx";

const AuthorizedMain = () => {
    const dispatch = useAppDispatch();
    const {posts} = useAppSelector((state) => state.blog)
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllPostsFunc(page))
    }, [page]);

    return (
        <div className="main__container">
            {
                posts.length
                    ? posts.map((post, index) => {
                        return <Post postData={post} key={index} />
                    })
                    : <p>Пусто</p>
            }
        </div>
    );
};

export default AuthorizedMain;