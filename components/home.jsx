import React, { useEffect, useState } from "react";
import ArticleList from "./articleList";
import { Link } from "react-router-dom";
import { getAllArticles } from "../utils/api";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then(({ data }) => {
      setArticles(data.articles);
    });
  }, []);

  return <ArticleList articles={articles} />;
};

export default Home;
