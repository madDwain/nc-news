import React, { useEffect, useState } from "react";
import ArticleList from "./articleList";
import { getAllArticles } from "../utils/api";
import { useParams } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSortBy, setIsSortBy] = useState("created_at");
  const [isOrder, setIsOrder] = useState("desc");
  const [isSubmit, setIsSubmit] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    getAllArticles(topic, isSortBy, isOrder).then(({ data }) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, [, topic, isSubmit]);

  if (isLoading) {
    return <p>Loading... Please wait...</p>;
  }

  return (
    <>
      <div className="sort-bar">
        <select
          name="sort-by"
          id="sort-by"
          onChange={(e) => {
            setIsSortBy(e.target.value);
          }}
        >
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
        </select>
        <select
          name="order"
          id="order"
          onChange={(e) => {
            setIsOrder(e.target.value);
          }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button
          onClick={() => {
            setIsSubmit(!isSubmit);
          }}
        >
          Submit
        </button>
      </div>
      <ArticleList articles={articles} isLoading={isLoading} />
    </>
  );
};

export default Home;
