import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://nc-news-dwainfco.onrender.com/api",
});

export function getAllArticles() {
  return ncNewsAPI.get("/articles", {});
}

export function getArticleByID(article_id) {
  return ncNewsAPI.get(`/articles/${article_id}`, {});
}

export function getCommentsByArticleID(article_id) {
  return ncNewsAPI.get(`/articles/${article_id}/comments`, {})
}

export function incArticleVote(article_id) {
  return ncNewsAPI.patch(`/articles/${article_id}`, {inc_votes: 1})
}

export function incDownArticleVote(article_id) {
  return ncNewsAPI.patch(`/articles/${article_id}`, {inc_votes: -1})
}
