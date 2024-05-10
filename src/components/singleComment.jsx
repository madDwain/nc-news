import React, { useState } from "react";
import { useLogin } from "../contexts/login";
import { deleteComment } from "../utils/api";

const SingleComment = ({ comment, setIsCommentDeleted, isCommentDeleted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useLogin();

  function handleClick(comment_id) {
    setIsLoading(true)
    deleteComment(comment_id)
      .then(() => {
        setIsCommentDeleted(!isCommentDeleted);
        setIsLoading(false)
      })
  }

  return (
    <div className="single-comment-container">
      <div className="single-article-line">
        <p className="article-author">Commenter: {comment.author}</p>
        <p className="article-created">Created at:{comment.created_at}</p>
      </div>
      <p className="comment-body">{comment.body}</p>
      <div className="single-article-line">
        <p className="article-vote-count">Vote count: {comment.votes}</p>
        <div className={`${isLoading ? 'hide-button' : 'show-button'}`}>
          <button
            onClick={() => {
              handleClick(comment.comment_id);
            }}
            className="btn"
            id={`user-comment-${user === comment.author ? true : false}`}
          >
            Delete Comment
          </button>
        </div>
        <p className={`${isLoading ? 'show-button' : 'hide-button'}`}>Deleting comment...</p>
      </div>
    </div>
  );
};

export default SingleComment;
