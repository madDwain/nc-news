import React, { useEffect, useState } from "react";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getTopics().then(({ data }) => {
      setTopics(data);
    });
  }, []);

  return (
    <ul className="topics-list">
      <p>Select a topic:</p>
      {topics.map((topic) => {
        return (
          <div className="topic-link-and-description">
            <Link className="topic-link" to={`/topic/${topic.slug}`}>
              {topic.slug}
            </Link>
            <p>{topic.description}</p>
          </div>
        );
      })}
    </ul>
  );
};

export default Topics;
