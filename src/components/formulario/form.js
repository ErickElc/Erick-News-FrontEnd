import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./form.scss";
import http from "../../api/api";
import { useNavigate, useParams } from "react-router";

export default function Form(props){
    const {id} = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: "",
        tags: ""
    })
    useEffect(()=>{
        if(props.editar){
            http.get(`/api/${id}`).then(res => {
                setInputs({
                    title: res.data.title,
                    description: res.data.description,
                    tags: (res.data.tags) ? res.data.tags : ''
                })
            }).catch(err => {
                if(err){
                    alert("Esse post não existe")
                    navigate('/')
                    console.log(err)
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
    },[props, id, navigate])
    async function SubmitForm(e){
        e.preventDefault();
        try{
            if(props.editar){
                await http.put(`/api/edit/${id}`,{
                    title: inputs.title,
                    description: inputs.description,
                    tags: inputs.tags
                })
                alert("Atualizado com sucesso");
                return navigate(`/topic/${id}`);
                
            }
            await http.post("/api/new",{
                title: inputs.title,
                description: inputs.description,
                tags: inputs.tags
            })
            alert("Post enviado com sucesso!");
            navigate("/")

        } 
        catch(err){
            console.log(err);
            if(props.editar){
                return alert("Não foi possível atualizar o tópico")
            }
            alert("Não foi possível criar o tópico");
        }

    }
    return(
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
                    rows={4}
                    variant="outlined"
                    value={inputs.description} 
                    onChange={ (e) => setInputs(prev => ({...prev, description: e.target.value}))}
                />
                <TextField 
                    id="outlined-basic"
                    label="Escreva uma tag" 
                    variant="outlined" 
                    value={inputs.tags}
                    onChange={ (e) => setInputs(prev => ({...prev, tags: e.target.value}))}
                    
                />
                <Button variant="contained" type="submit">Postar</Button>
            </form>
        </div>
    )
}