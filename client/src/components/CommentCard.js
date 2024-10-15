function CommentCard({ comment }) {

    const { body } = comment;

    return (
        <div className="comment-card">
            <p>{body}</p>
        </div>
    )
}

export default CommentCard;