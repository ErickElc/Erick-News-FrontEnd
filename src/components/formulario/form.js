import { NoHaveAccess } from "../ProtectLayout/ProtectedLayout";
import { useNavigate, useParams } from "react-router";
import { getUserLocalStorage } from "../../auth/util";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import http from "../../api/api";
import "./form.scss";
import {  useModalContext } from "../../context/modalContext";
import ModalPreview from "../modalPreview/ModalPreview";
export default function Form(props){
    const {id} = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: "",
        tags: ""
    });
    const modalContext = useModalContext();
    useEffect(()=>{
        if(props.editar){
            http.get(`/api/posts/${id}`).then(res => {
                setInputs({
                    title: res.data.title,
                    description: res.data.description,
                    tags: (res.data.tags) ? res.data.tags : ''
                })
            }).catch(err => {
                if(err){
                    alert("Esse post não existe");
                    navigate('/');
                    console.log(err);
                }
            })
        }
        else{
            setInputs({
                title: '',
                description: "",
                tags: ""
            })
        }
    },[props, id, navigate]);
    async function SubmitForm(e){
        e.preventDefault();
        const User = getUserLocalStorage();
        try{
            if(props.editar){
                await http.put(`/api/posts/edit/${id}`,{
                    title: inputs.title,
                    email: User.email,
                    token: User.token,
                    description: inputs.description,
                    tags: inputs.tags
                })
                alert("Atualizado com sucesso");
                return navigate(`/topic/${id}`);
                
            }
            await http.post("/api/posts/new",{
                title: inputs.title,
                description: inputs.description,
                email: User.email,
                token: User.token,
                tags: inputs.tags
            })
            alert("Post enviado com sucesso!");
            navigate("/");

        } 
        catch(err){
            console.log(err);
            if(props.editar){
                
                alert("Não foi possível atualizar o tópico")
                return navigate('/login');
            }
            alert("Não foi possível criar o tópico");
        }
    }
    function ToggleMode(){
        modalContext.OpenModal()
    }
    return(
        <NoHaveAccess editar={props.editar} id={id}>
                <div className="ContainerCadastro">
                    <form method="post" onSubmit={SubmitForm} className="ContainerForm"> 
                        <h2>{(!props.editar) ? "Criar Tópico" : "Atualizar Tópico"}</h2>
                        <TextField 
                            id="outlined-basic"
                            label="titulo" 
                            variant="outlined"
                            required 
                            value={inputs.title}
                            onChange={ (e) => setInputs(prev => ({...prev, title: e.target.value}))}
                        />
                        <TextField
                            required
                            id="standard-multiline-static"
                            label="Descrição"
                            multiline
                            rows={10}
                            variant="outlined"
                            value={inputs.description} 
                            onChange={ (e) => setInputs(prev => ({...prev, description: e.target.value}))}
                        />
                        <p className='preview' onClick={ToggleMode}>Preview</p>
                        <TextField 
                            id="outlined-basic"
                            label="Escreva uma tag" 
                            variant="outlined" 
                            value={inputs.tags}
                            onChange={ (e) => setInputs(prev => ({...prev, tags: e.target.value}))}
                            
                        />
                        <Button variant="contained" type="submit">{(!props.editar) ? "Publicar" : "Atualizar"}</Button>
                    </form>
                    <ModalPreview inputs={inputs}/>
                </div>
        </NoHaveAccess>
    )
}