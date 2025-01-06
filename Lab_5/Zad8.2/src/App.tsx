import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Blog from "./components/Blog";
import AddArticle from "./components/AddArticle";
import Article from "./components/Article";

function App() {

  return (
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/article/:id" element={<Article/>} />
          <Route path="/dodaj" element={<AddArticle/>} />
      </Routes>
  )
}

export default App
