import React from 'react'
import SingleArticle from './singleArticle'

const ArticleList = ({articles}) => {
  return (
    <ul>
        {articles.map((article) => {
            return <SingleArticle article={article} key={article.article_id}></SingleArticle>
        })}
    </ul>
  )
}

export default ArticleList
