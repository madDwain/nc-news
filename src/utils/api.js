import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://nc-news-dwainfco.onrender.com/api",
});

export function getAllArticles(topic) {
  return ncNewsAPI.get("/articles", {
    params: {
      topic,
    },
  });
}

export function getArticleByID(article_id) {
  return ncNewsAPI.get(`/articles/${article_id}`, {});
}

export function getCommentsByArticleID(article_id) {
  return ncNewsAPI.get(`/articles/${article_id}/comments`, {});
}

export function incArticleVote(article_id) {
  return ncNewsAPI.patch(`/articles/${article_id}`, { inc_votes: 1 });
}

export function incDownArticleVote(article_id) {
  return ncNewsAPI.patch(`/articles/${article_id}`, { inc_votes: -1 });
}

export function postComment(user, commentBody, article_id) {
  return ncNewsAPI.post(`/articles/${article_id}/comments`, {
    username: user,
    body: commentBody,
  });
}

export function getUsers() {
  return ncNewsAPI.get("/users", {});
}

export function deleteComment(comment_id) {
  return ncNewsAPI.delete(`/comments/${comment_id}`, {});
}

export function getTopics() {
  return ncNewsAPI.get("/topics", {});
}
