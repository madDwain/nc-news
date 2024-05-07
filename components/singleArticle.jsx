import React from "react";

const SingleArticle = ({ article }) => {
  return (
    <div className="single-article-container">
      <div className="single-article-line">
        <p className="article-title">{article.title}</p>
        <p className="article-topic">{article.topic}</p>
        <p className="article-author">{article.author}</p>
      </div>
      <div className='single-article-line'>
        <p className='article-comment-count'>Comment Count: {article.comment_count}</p>
        <p className='article-vote-count'>Vote Count: {article.votes}</p>
      </div>
    </div>
  );
};

export default SingleArticle;
