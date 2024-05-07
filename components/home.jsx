import React, { useEffect, useState } from "react";
import ArticleList from "./articleList";
import { Link } from "react-router-dom";
import { getAllArticles } from "../utils/api";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllArticles().then(({ data }) => {
      setArticles(data.articles);
      setIsLoading(false);
    })
  }, []);

  if (isLoading) {
    return <p>Loading... Please wait...</p>;
  }

  return <ArticleList articles={articles} isLoading={isLoading} />;
};

export default Home;
