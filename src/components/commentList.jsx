import React from "react";
import SingleComment from "./singleComment";

const CommentList = ({
  comments,
  isLoading,
  isCommentListError,
  setIsCommentDeleted,
  isCommentDeleted,
}) => {
  if (isCommentListError) {
    return <p>Rats! Something is NOT good...</p>;
  }

  if (isLoading) {
    return <p>Loading... Please wait...</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => {
        return (
          <SingleComment
            setIsCommentDeleted={setIsCommentDeleted}
            comment={comment}
            key={comment.comment_id}
            isCommentDeleted={isCommentDeleted}
          ></SingleComment>
        );
      })}
    </ul>
  );
};

export default CommentList;
