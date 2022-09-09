import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/useAuth';
import { ProtectedLayoutNoLogged } from '../../components/ProtectLayout/ProtectedLayout';
import './login.scss';

export default function Login(){
    const auth = useAuth();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''    
    })
    const [response, setResponse] = useState('');
    async function SubmitForm(e){
        e.preventDefault();
        try {
            const loginRequest = await auth.authenticate(inputs.email, inputs.password);
            if(loginRequest === 202){
                alert('login feito com sucesso');
                navigate('/')
                return (window.location.reload());
            }
            return alert('email ou senha incorreta(s)');
        } catch (error) {
            setResponse('email ou senha incorreto');

        }

    }
    return (
        <ProtectedLayoutNoLogged>
            <section>
                <div className="container-form">
                    <h1>Login</h1>
                    <h4 style={{color: "#ff0000", margin: '10px'}}>{response}</h4>
                    <form onSubmit={SubmitForm}>
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
                        <Button variant="contained" className="inputs" type="submit" color="success">Entrar</Button>
                    </form>
                </div>
        </section>
    </ProtectedLayoutNoLogged>
    )
}