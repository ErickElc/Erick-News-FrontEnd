import { Route, Routes } from "react-router";
import Header from "../components/header/header";
import Formularios from "../pages/formularios/post";
import Home from "../pages/home/home"
import News from "../pages/news/news";
import NotFound from "../pages/notfound/notfound";




function App() {
  return (
    <div>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="publicar" element={<Formularios/>}/>
            <Route path="editar/:id" element={<Formularios editar={true}/>}/>
            <Route path="topic/:id" element={<News/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
  );
}

export default App;
