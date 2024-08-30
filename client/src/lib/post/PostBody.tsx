type Props = {
    image: string,
    body: string,
    tags: string[]
}

const PostBody = (props: Props) => {
    return (
        <>
            {props.image && <img className="post-image" src={props.image} alt={props.image}/>}
            <div className="post__body">{props.body}</div>
            <div className="post__tags flex">
                {props.tags.map((tag: string, index: number) => {
                    return <div className="post__tags-tag" key={index}>#{tag}</div>
                })}
            </div>
        </>
    );
};

export default PostBody;