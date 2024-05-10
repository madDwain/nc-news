import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  getArticleByID,
  incArticleVote,
  incDownArticleVote,
  getCommentsByArticleID,
} from "../utils/api";
import Comments from "./comments";

const SingleArticleDetails = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [commentsHidden, setCommentsHidden] = useState(true);
  const [article, setArticle] = useState([]);
  const [voteCount, setVoteCount] = useState(article.votes);
  const [commentCount, setCommentCount] = useState("");
  const [isCommentListError, setIsCommentListError] = useState(false);
  const [comments, setComments] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    getArticleByID(article_id)
      .then(({ data }) => {
        setIsError(false);
        setArticle(data.article);
        setCommentCount(data.article.comment_count);
        setVoteCount(data.article.votes);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    getCommentsByArticleID(article_id)
      .then(({ data }) => {
        setIsCommentListError(false);
        if (!data.comments) {
          setIsCommentListError(true);
        }
        setComments(data.comments);
        setCommentCount(data.comments.length);
        setIsLoading(false);
      })
      .catch(() => {
        setIsCommentListError(true);
      });
  }, [article]);

  function handleVoteClick(article_id) {
    setVoteCount(voteCount + 1);
    setHasVoted(true);
    incArticleVote(article_id)
      .then(({ data }) => {
        setVoteCount(data.votes);
        setIsClicked(!isClicked);
      })
      .then(() => {
        getArticleByID(article_id)
          .then(({ data }) => {
            setIsError(false);
            setVoteCount(data.article.votes);
            setIsLoading(false);
          })
          .catch(() => {
            setIsError(true);
          });
      });
  }

  function handleDownvoteClick(article_id) {
    setVoteCount(voteCount - 1);
    setHasVoted(true);
    incDownArticleVote(article_id)
      .then(({ data }) => {
        setVoteCount(data.votes);
        setIsClicked(!isClicked);
      })
      .then(() => {
        getArticleByID(article_id)
          .then(({ data }) => {
            setIsError(false);
            setVoteCount(data.article.votes);
            setIsLoading(false);
          })
          .catch(() => {
            setIsError(true);
          });
      });
  }

  if (isLoading) {
    return <p>Loading... Please wait...</p>;
  }

  if (isError) {
    return <p>Uh Oh Spaghettios! Something has gone wrong...</p>;
  }

  return (
    <div className="single-article-full-details">
      <p className="article-title">{article.title}</p>
      <img src={article.article_img_url} className="single-article-img"></img>
      <div className="single-article-line">
        <p className="article-author">Author: {article.author}</p>
        <p className="article-topic">Topic: {article.topic}</p>
      </div>
      <p className="article-body">{article.body}</p>
      <div className="single-article-line">
        <p className="article-comment-count">Comment Count: {commentCount}</p>
        <p className="article-vote-count">Votes: {voteCount}</p>
      </div>
      <div className="single-article-line">
        <button
          className="btn"
          onClick={() => setCommentsHidden(!commentsHidden)}
        >{`${commentsHidden ? "Show" : "Hide"} Comments`}</button>
        <div className={`has-voted-${hasVoted}`} id="vote-btns">
          <button className="btn" onClick={() => handleVoteClick(article_id)}>
            Vote+
          </button>
          <button
            className="btn"
            onClick={() => handleDownvoteClick(article_id)}
          >
            Vote-
          </button>
        </div>
        <p className={`has-voted-${hasVoted}`} id="vote-message">Thanks for voting!</p>
      </div>
      <div className={`comment-list-${commentsHidden ? "hidden" : "shown"}`}>
        <Comments
          article={article}
          setCommentCount={setCommentCount}
          isCommentListError={isCommentListError}
          isLoading={isLoading}
          comments={comments}
          setComments={setComments}
        />
      </div>
      <p className="article-created">Created: {article.created_at}</p>
    </div>
  );
};

export default SingleArticleDetails;
