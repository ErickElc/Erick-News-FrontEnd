import { useNavigate } from "react-router"
import { TextField } from "@mui/material"
import { useState } from "react"
import Button from '@mui/material/Button';
import http from "../../api/api"
import './cadastro.scss'
import { ProtectedLayoutNoLogged } from "../../components/ProtectLayout/ProtectedLayout";
export default function Cadastro(){
    const [inputs, setInputs] = useState({
        name: '',
        age: '',
        email: '',
        password: ''
    })
    const [response, setResponse] = useState('');
    const navigate = useNavigate();
    async function SubmitForm(e){
        e.preventDefault()
        try {
            const registerUser = await http.post('/api/users/register',{
                name: inputs.name,
                age: inputs.age,
                email: inputs.email,
                password: inputs.password,
            })
            console.log(registerUser)
            if(registerUser.status === 201){
                alert('Usuário criado com sucesso!')
                return navigate('/login')
            }
        } catch (error) {
            setResponse('Esse e-mail já foi cadastrado!');
            console.log(error)
        }
    }
    return(
        <ProtectedLayoutNoLogged>
            <section>
                <h3 style={{color: 'red'}}>Não use senhas verdadeiras</h3>
                <div className="container-form">
                    <h1>Cadastrar</h1>
                    <h4 style={{color: "#ff0000", margin: '10px'}}>{response}</h4>
                    <form onSubmit={SubmitForm}>
                        <TextField
                            className="inputs"
                            required
                            id="outlined-basic"
                            label="Nome"
                            type='text'
                            rows={4}
                            variant="outlined"
                            value={inputs.name} 
                            onChange={ (e) => setInputs(prev => ({...prev, name: e.target.value}))}
                        />
                        <TextField
                            required
                            className="inputs"
                            id="outlined-basic"
                            label="Idade"
                            rows={4}
                            type='number'
                            variant="outlined"
                            value={inputs.age} 
                            onChange={ (e) => setInputs(prev => ({...prev, age: e.target.value}))}
                        />
                        <TextField
                            required
                            className="inputs"
                            id="outlined-basic"
                            label="Email"
                            type='email'
                            rows={4}
                            variant="outlined"
                            value={inputs.email} 
                            onChange={ (e) => setInputs(prev => ({...prev, email: e.target.value}))}
                        />
                        <TextField
                            required
                            className="inputs"
                            id="outlined-basic"
                            type='password'
                            label="Senha"
                            rows={4}
                            variant="outlined"
                            value={inputs.password} 
                            onChange={ (e) => setInputs(prev => ({...prev, password: e.target.value}))}
                        />
                        <Button variant="contained" className="inputs" type="submit" color="success">Cadastrar</Button>
                    </form>
                </div>
        </section>
    </ProtectedLayoutNoLogged>
    )
}