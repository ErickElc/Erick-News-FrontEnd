import { useEffect, useState } from "react";
import http from "../../api/api";
import ListaPubli from "../ListaPubli/listaPubli";
import "./main.scss";

export default function Main(){
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        http.get('/api/posts/all').then(res => {
            if(typeof res.data === 'object'){
                setPosts(res.data);
            }
        }).catch(err => {console.log(err)});
    },[])
    return(
        <main>
            {posts.map((item, index) => 
                <ListaPubli post={item} index={index} key={item._id}/>
            )}
        </main>
    )
}