import {PostType} from "../../store/types/blogTypes"

type Props = {
    postData: PostType
}

const Post = (props: Props) => {
    return (
        <div className="post__container">
            <p>{props.postData.userName}</p>
            {props.postData.images.length
            && (props.postData.images.length === 1)
                ? <img src={props.postData.images[0]} alt={props.postData.images[0]}/>
                : (<div className="post__images">
                    {props.postData.images.map((image, index) => (
                        <img src={image} alt={image} key={index} />
                    ))}
                </div>)
            }
            <div className="post-body">{props.postData.body}</div>
            <div className="post__icons">
                <div className="post__icons-likes">
                    {"<3"} {props.postData.countLikes}
                </div>
                <div className="post__icons-comments">
                    {"`{ }"}
                </div>
            </div>
        </div>
    );
};

export default Post;