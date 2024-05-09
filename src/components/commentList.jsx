import React from "react";
import SingleComment from "./singleComment";

const CommentList = ({ comments, isLoading, isCommentListError }) => {
  if (isCommentListError) {
    return <p>Rats! Something is NOT good...</p>;
  }

  if (isLoading) {
    return <p>Loading... Please wait...</p>;
  }

  return (
    <>
      <ul className="comment-list">
        {comments.map((comment) => {
          return (
            <SingleComment
              comment={comment}
              key={comment.comment_id}
            ></SingleComment>
          );
        })}
      </ul>
    </>
  );
};

export default CommentList;
