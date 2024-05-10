import React from "react";
import { useLogin } from "../contexts/login";

const SingleComment = ({ comment }) => {
  const { user } = useLogin();
  return (
    <div className="single-comment-container">
      <div className="single-article-line">
        <p className="article-author">Commenter: {comment.author}</p>
        <p className="article-created">Created at:{comment.created_at}</p>
      </div>
      <p className="comment-body">{comment.body}</p>
      <div className="single-article-line">
        <p className="article-vote-count">Vote count: {comment.votes}</p>
        <button
          className="btn"
          id={`user-comment-${user !== null ? true : false}`}
        >
          Delete Comment
        </button>
      </div>
    </div>
  );
};

export default SingleComment;
