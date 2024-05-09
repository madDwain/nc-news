import React, { useState, useEffect } from "react";
import CommentList from "./commentList";
import { postComment, getCommentsByArticleID } from "../../utils/api";
import { Link, useParams } from "react-router-dom";

const Comments = ({ article }) => {
  const { article_id } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const [commenter, setCommenter] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentListError, setIsCommentListError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPostCommentShown, setIsPostCommentShown] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [commentCount, setCommentCount] = useState(article.comment_count);

  useEffect(() => {
    getCommentsByArticleID(article_id)
      .then(({ data }) => {
        setIsCommentListError(false);
        if (!data.comments) {
          setIsCommentListError(true);
        }
        setComments(data.comments);
        console.log(article.comment_count, "comment_count");
        setIsLoading(false);
      })
      .catch(() => {
        setIsCommentListError(true);
      });
  }, [article, isSubmitted]);

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
    return postComment(commenter, commentBody, article_id)
      .then((data) => {
        setCommentCount(Number(commentCount) + 1);
        setIsCommentListError(false);
        setIsSubmitted(!isSubmitted);
        setIsSuccessful(true);
        console.log(data);
      })
      .catch(() => {
        setIsSuccessful(false);
      });
  }

  if (article.length === 0) {
    return (
      <Link to={`/articles/${article_id}`}>
        Something has gone wrong... Click here to reload
      </Link>
    );
  }

  return (
    <div className="single-article-full-details">
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
        <p className="empty-comment-msg">
          {isSuccessful ? (
            <></>
          ) : (
            "Something has gone wrong, the comment has not been posted."
          )}
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
      ></CommentList>
    </div>
  );
};

export default Comments;
