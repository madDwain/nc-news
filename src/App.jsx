import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Home from "../components/home";
import Topics from "../components/topics";
import Comments from "../components/comments";
import { useState } from "react";
import ArticleList from "../components/articleList";

function App() {
  return (
    <>
    NC News
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/topics' element={<Topics />} />
      </Routes>
    </>
  );
}

export default App;
