import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Topics from "./components/topics";
import SingleArticleDetails from "./components/singleArticleDetails";

function App() {

  return (
    <>
    NC News
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/topics' element={<Topics />} />
        <Route path='/articles/:article_id' element={<SingleArticleDetails/>}/>
      </Routes>
    </>
  );
}

export default App;
