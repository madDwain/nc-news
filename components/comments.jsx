import React from "react";
import CommentList from "./commentList";

const Comments = ({article}) => {

  return (
    <div className="single-article-full-details">
      <p className="article-title">{article.title}</p>
      <div className="single-article-line">
        <p className="article-author">Author: {article.author}</p>
        <p className="article-topic">Topic: {article.topic}</p>
      </div>
      <p className="article-body">{article.body}</p>
      <div className="single-article-line">
        <p className="article-comment-count">
          Comment Count: {article.comment_count}
        </p>
      </div>
      <CommentList></CommentList>
    </div>
  );
};

export default Comments;
