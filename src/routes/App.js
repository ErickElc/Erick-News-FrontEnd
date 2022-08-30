import { Route, Routes } from "react-router";
import Header from "../components/header/header";
import Post from "../pages/post/post"
import Home from "../pages/home/home"




function App() {
  return (
    <div>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/publicar" element={<Post/>}/>
      </Routes>
    </div>
  );
}

export default App;
