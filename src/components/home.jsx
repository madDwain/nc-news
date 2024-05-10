import React, { useEffect, useState } from "react";
import ArticleList from "./articleList";
import { getAllArticles } from "../utils/api";
import { useParams } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    getAllArticles(topic).then(({ data }) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, [ , topic]);

  if (isLoading) {
    return <p>Loading... Please wait...</p>;
  }

  return <ArticleList articles={articles} isLoading={isLoading} />;
};

export default Home;
