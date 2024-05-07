import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getArticleByID } from "../utils/api";

const SingleArticleDetails = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getArticleByID(article_id)
      .then(({ data }) => {
        setIsError(false)
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true)
      });
  }, [article]);

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
        <p className="article-created">Created: {article.created_at}</p>
        <p className="article-votes">Votes: {article.votes}</p>
      </div>
    </div>
  );
};

export default SingleArticleDetails;
