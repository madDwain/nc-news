import React, { useState, useEffect } from "react";
import { postComment, getCommentsByArticleID } from "../utils/api";
import { useParams } from "react-router-dom";
import CommentList from "./commentList";

const Comments = ({
  article,
  setCommentCount,
  isCommentListError,
  isLoading,
  comments,
  setComments
}) => {
  const { article_id } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const [commenter, setCommenter] = useState("");
  const [isPostCommentShown, setIsPostCommentShown] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  function handleClickPostComment() {
    setIsPostCommentShown(!isPostCommentShown);
  }

  useEffect(() => {
    if (!commenter || !commentBody) {
      setIsEmpty(true);
    } else setIsEmpty(false);
  }, [commenter, commentBody]);

  function handleSubmitComment(commenter, commentBody, e) {
    e.preventDefault();
    return postComment(commenter, commentBody, article_id).then(() => {
      setCommentCount(article.comment_count)
      getCommentsByArticleID(article_id).then(({data}) => {
        setComments(data.comments)
      })
    })
  }

  return (
    <div className="post-comment">
      <button
        className="btn"
        onClick={() => {
          handleClickPostComment();
        }}
        id="post-comment-button"
      >
        {isPostCommentShown ? "Hide" : "Post a comment"}
      </button>
      <div
        className={`post-comment-${isPostCommentShown ? "shown" : "hidden"}`}
      >
        <p className="empty-comment-msg">
          {isEmpty ? "Please fill in Username & Comment" : ""}
        </p>

        <div className="single-post-comment-line">
          <label htmlFor="commenter">Username:</label>
          <input
            value={commenter}
            type="Text"
            id="commenter"
            onChange={(e) => {
              setCommenter(e.target.value);
            }}
          ></input>
        </div>
        <div className="single-post-comment-line">
          <label htmlFor="comment-body">Body:</label>
          <textarea
            value={commentBody}
            type="Text"
            id="comment-body"
            rows="4"
            onChange={(e) => {
              setCommentBody(e.target.value);
            }}
          ></textarea>
        </div>
        <button
          className="btn"
          onClick={(e) => {
            handleSubmitComment(commenter, commentBody, e);
          }}
        >
          Submit
        </button>
      </div>
      <CommentList
        comments={comments}
        isLoading={isLoading}
        isCommentListError={isCommentListError}
      />
    </div>
  );
};

export default Comments;
