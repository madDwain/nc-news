import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://nc-news-dwainfco.onrender.com/api",
});

export function getAllArticles() {
    return ncNewsAPI.get("/articles", {
      });
}
