import { Route, Routes } from "react-router";
import { AuthProvider } from "../auth/Auth";
import Header from "../components/header/header";
import Cadastro from "../pages/cadastro/cadastro";
import Formularios from "../pages/formularios/post";
import Home from "../pages/home/home"
import Login from "../pages/login/login";
import News from "../pages/news/news";
import NotFound from "../pages/notfound/notfound";




function App(){
  return (
    <AuthProvider>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cadastrar" element={<Cadastro/>}/>
          <Route path="/topic/:id" element={<News/>}/>
          <Route path="/publicar" element={<Formularios/>}/>
          <Route path="/editar/:id" element={<Formularios editar={true}/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
