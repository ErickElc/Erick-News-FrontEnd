import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router";
import http from "../../api/api";
import DeleteIcon from '@mui/icons-material/Delete';
import Comment from "../../components/comment/comment";
import './news.scss'
export default function News(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [topic, setTopic] = useState({});

    function Redirect(){
        navigate(`/editar/${id}`)
    }
    async function deletePost(){
        try {
            await http.delete(`/api/remove/${id}`);
            alert("Post deletado com sucesso!")
            navigate('/')


        } 
        catch (error) {
            console.log(error);
            alert("Não foi possível deletar");
        }
    }
    useEffect(()=>{
        http.get(`/api/${id}`).then(res => {
            setTopic(res.data);
        }).catch(err => {
            if(err){
                alert("Essa página não existe");
                navigate('/');
            }
        })
    },[id, navigate]);
   
    return(
        <main>
            <Button variant="contained" className="buttons" onClick={deletePost} id="button" startIcon={<DeleteIcon />}>Deletar Post</Button>
            <div className="Container-news">
                <Button variant="outlined" className="buttons"onClick={Redirect}>Editar</Button>
                <h2>{topic?.title}</h2>
                <p>{topic?.description}</p>
                <p id="tags"><span>tags: </span>{topic?.tags}</p>
            </div>
            <Comment/>
        </main>
    )

}