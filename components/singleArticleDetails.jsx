import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getArticleByID } from "../utils/api";

const SingleArticleDetails = () => {
  const { article_id } = useParams();
  const [singleArticleTitle, setSingleArticleTitle] = useState("");
  const [singleArticleTopic, setSingleArticleTopic] = useState("");
  const [singleArticleAuthor, setSingleArticleAuthor] = useState("");
  const [singleArticleBody, setSingleArticleBody] = useState("");
  const [singleArticleCreated, setSingleArticleCreated] = useState("");
  const [singleArticleVotes, setSingleArticleVotes] = useState("");
  const [singleArticleImg, setSingleArticleImg] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getArticleByID(article_id).then(({ data }) => {
      setSingleArticleTitle(data.article.title);
      setSingleArticleTopic(data.article.topic);
      setSingleArticleAuthor(data.article.author);
      setSingleArticleBody(data.article.body);
      setSingleArticleCreated(data.article.created_at);
      setSingleArticleVotes(data.article.votes);
      setSingleArticleImg(data.article.article_img_url);
      setIsLoading(false)
    });
  }, []);

  if (isLoading) {
    return <p>Loading... Please wait...</p>
  }

  return (
    <div className="single-article-full-details">
      <p className="article-title">{singleArticleTitle}</p>
      <img src={singleArticleImg} className='single-article-img'></img>
      <div className='single-article-line'>
      <p className="article-author">Author: {singleArticleAuthor}</p>
      <p className="article-topic">Topic: {singleArticleTopic}</p>
      </div>
      <p className="article-body">{singleArticleBody}</p>
      <div className='single-article-line'>
      <p className="article-created">Created: {singleArticleCreated}</p>
      <p className="article-votes">Votes: {singleArticleVotes}</p>
      </div>
    </div>
  );
};

export default SingleArticleDetails;
