import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import axios from "axios"
import "./form.scss";

export default function Form(){
    const [inputs, setInputs] = useState({
        title: '',
        description: "",
        tags: ""
    })
    function SubmitForm(e){
        e.preventDefault();
        console.log(inputs)
        // axios.post("link",{
        //     title: inputs.title,
        //     description: inputs.description,
        //     tags: inputs.tags
        // })
    }
    return(
        <div className="ContainerCadastro">
            <form method="post" onSubmit={SubmitForm} className="ContainerForm"> 
                <h2>Enviar Post</h2>
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