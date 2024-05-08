import React, { useEffect, useState } from "react";
import SingleComment from "./singleComment";
import { getCommentsByArticleID } from "../utils/api";
import { useParams } from "react-router-dom";

const CommentList = () => {
  const {article_id } = useParams()
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false)

  useEffect(() => {
    getCommentsByArticleID(article_id).then(({ data }) => {
      setError(false)
      if (!data.comments) {
        setError(true)
      }
      setComments(data.comments);
      setIsLoading(false);

    })
    .catch(() => {
      setError(true)
    })
  }, []);

  if (isError) {
    return <p>Rats! Something is NOT good...</p>;
  }

  if (isLoading) {
    return <p>Loading... Please wait...</p>;
  }


  return (
    <>
    {/* button not functional yet */}
    <button className="btn">Post a comment</button>
    <ul className="comment-list">
      {comments.map((comment) => {
        return (
          <SingleComment
            comment={comment}
            key={comment.comment_id}
          ></SingleComment>
        );
      })}
    </ul>
    </>
  );
};

export default CommentList;
