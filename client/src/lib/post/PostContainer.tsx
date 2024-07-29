import {useEffect, useState} from 'react';
import Post from "./Post.tsx";
import {getAllPostsFunc} from "../../store/actions/blogAction";
import {useAppDispatch, useAppSelector} from "../../hooks/stateHooks.ts";

const PostContainer = () => {
    const {posts} = useAppSelector((state) => state.blog)
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllPostsFunc(page))
    }, [page]);


    return (
        <div className="post">
            <div className="post__container">
                {posts.map((post, index) => {
                    return <Post postData={post} key={index}/>
                })}
            </div>
        </div>
    );
};

export default PostContainer;