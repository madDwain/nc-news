import React from "react";

const SingleComment = ({ comment }) => {
  return (
    <div className="single-comment-container">
      <div className="single-article-line">
        <p className="article-author">Commenter: {comment.author}</p>
        <p className="article-created">Created at:{comment.created_at}</p>
      </div>
      <p className="comment-body">{comment.body}</p>
      <div className="single-article-line">
        <p className="article-vote-count">Vote count: {comment.votes}</p>
        {/* not functional yet button */}
        <button className="btn">Vote</button>
      </div>
    </div>
  );
};

export default SingleComment;
