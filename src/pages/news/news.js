import Comment from "../../components/comment/comment";
import {  useNavigate, useParams } from "react-router";
import { getUserLocalStorage } from "../../auth/util";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { Button } from "@mui/material";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw'
import http from "../../api/api";
import './news.scss'

export default function News(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [topic, setTopic] = useState({});
    const User = getUserLocalStorage();
    function Redirect(){
        navigate(`/editar/${id}`)
    }
    async function deletePost(){
        try {
            await http.post(`/api/posts/remove/${id}`,{
                token: User.token,
                email: User.email
            });
            alert("Post deletado com sucesso!")
            navigate('/')
        } 
        catch (error) {
            console.log(error);
            alert("Não foi possível deletar");
        }
    }
    useEffect(()=>{
        http.get(`/api/posts/${id}`)
        .then(res => {
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
            {User?.email !== topic.autor?.email ? (<></>) : (
                <Button variant="contained" className="buttons" onClick={deletePost} id="button" startIcon={<DeleteIcon />}>Deletar Post</Button>
            )}
            <div className="Container-news">
                <p style={{marginBottom: "10px"}}>Autor: <span style={{color: "gray"}}>{topic.autor?.name}</span></p>
                {User?.email !== topic.autor?.email ? (<></>) : (
                    <Button variant="outlined" className="buttons"onClick={Redirect}>Editar</Button>
                )}
                <h2>{topic?.title}</h2>
                <div className="markdownContainer">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} className='markdown'>{topic?.description}</ReactMarkdown>
                </div>
                <p id="tags"><span>tags: </span>{topic?.tags}</p>
                <Comment/>  
            </div>
        </main>
    )

}