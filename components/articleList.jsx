import React from "react";
import SingleArticle from "./singleArticle";

const ArticleList = ({ articles }) => {
  return (
    <ul className="article-list">
      {articles.map((article) => {
        return (
          <SingleArticle
            article={article}
            key={article.article_id}
          ></SingleArticle>
        );
      })}
    </ul>
  );
};

export default ArticleList;
