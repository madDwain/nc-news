import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { getArticleByID, incArticleVote, incDownArticleVote } from "../utils/api";

const SingleArticleDetails = ({ article, setArticle }) => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [voteCount, setVoteCount] = useState(article.votes);

  useEffect(() => {
    getArticleByID(article_id)
      .then(({ data }) => {
        setIsError(false);
        setArticle(data.article);
        setVoteCount(data.article.votes);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    getArticleByID(article_id)
      .then(({ data }) => {
        setIsError(false);
        setVoteCount(data.article.votes);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [isClicked]);

  function handleVoteClick(article_id) {
    setVoteCount(voteCount + 1);
    incArticleVote(article_id).then(({ data }) => {
      setVoteCount(data.votes);
      setIsClicked(!isClicked);
    });
  }

  function handleDownvoteClick(article_id) {
    setVoteCount(voteCount - 1);
    incDownArticleVote(article_id).then(({ data }) => {
      setVoteCount(data.votes);
      setIsClicked(!isClicked);
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
        <p className="article-comment-count">
          Comment Count: {article.comment_count}
        </p>
        <p className="article-vote-count">Votes: {voteCount}</p>
      </div>
      <div className="single-article-line">
        <Link to={`/articles/${article_id}/comments`}>
          <button className="btn">View/Post Comments</button>
        </Link>
        <div>
          <button className="btn" onClick={() => handleVoteClick(article_id)}>
            Vote+
          </button>
          <button className="btn" onClick={() => handleDownvoteClick(article_id)}>
            Vote-
          </button>
        </div>
      </div>
      <p className="article-created">Created: {article.created_at}</p>
    </div>
  );
};

export default SingleArticleDetails;
