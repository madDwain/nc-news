import React, { useState, useEffect } from "react";
import { postComment, getCommentsByArticleID } from "../utils/api";
import { useParams } from "react-router-dom";
import CommentList from "./commentList";
import { useLogin } from "../contexts/login";

const Comments = ({
  article,
  setCommentCount,
  isCommentListError,
  isLoading,
  comments,
  setComments,
}) => {
  const { article_id } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const [isPostCommentShown, setIsPostCommentShown] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [hasCommented, setHasCommented] = useState(false);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);

  const { user } = useLogin();

  function handleClickPostComment() {
    setIsPostCommentShown(!isPostCommentShown);
  }

  useEffect(() => {
    if (!commentBody) {
      setIsEmpty(true);
    } else setIsEmpty(false);
  }, [commentBody]);

  useEffect(() => {
    getCommentsByArticleID(article_id).then(({ data }) => {
      setComments(data.comments);
      setCommentCount(data.comments.length)
      console.log('resetting comments')
    });
  }, [isCommentDeleted]);

  function handleSubmitComment(commentBody, e) {
    e.preventDefault();
    return postComment(user, commentBody, article_id).then(() => {
      setCommentCount(article.comment_count);
      getCommentsByArticleID(article_id).then(({ data }) => {
        setComments(data.comments);
        setHasCommented(true);
        setIsPostCommentShown(false);
      });
    });
  }

  return (
    <div className="post-comment">
      <p>{`${hasCommented ? `Thank you for commenting, ${user}!` : ""}`}</p>
      <button
        className="btn"
        onClick={() => {
          handleClickPostComment();
        }}
        id={`post-comment-button-${hasCommented ? "hidden" : "shown"}`}
      >
        {isPostCommentShown ? "Hide" : "Post a comment"}
      </button>
      <div
        className={`post-comment-${isPostCommentShown ? "shown" : "hidden"}`}
      >
        <p className="empty-comment-msg">
          {isEmpty ? "Please fill in Comment" : ""}
        </p>
        <p id="commenter">{user === null ? "Please login" : `${user}`}</p>
        <div
          className={`comment-body-and-submit-${
            user === null ? "hidden" : "shown"
          }`}
        >
          <div className="single-post-comment-line">
            <label htmlFor="comment-body" id="comment-label">
              Body:
            </label>
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
              handleSubmitComment(commentBody, e);
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <CommentList
        comments={comments}
        setIsCommentDeleted={setIsCommentDeleted}
        isLoading={isLoading}
        isCommentListError={isCommentListError}
        isCommentDeleted={isCommentDeleted}
      />
    </div>
  );
};

export default Comments;
