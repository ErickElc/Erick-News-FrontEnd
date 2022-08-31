import { TextField , Button} from "@mui/material"
import { useEffect, useState } from "react"
import SendIcon from '@mui/icons-material/Send';
import http from "../../api/api";
import { useParams } from "react-router";


export default function Comment(){
    const [comments, setComments] = useState([]);
    const [inputs, setInputs] = useState({
        input1: '',
    })
    const {id} = useParams();

    useEffect(()=>{
        http.get('/api/comments/all').then(res => {
            const dado = res.data;
            const dados = [];
            for(let i in dado){
                if(dado[i].postId === id){
                    dados.push(dado[i]);
                }
            }
            setComments(dados);
        }).catch(err => console.log(err))
    },[id,comments])
    async function SubmitForm(e){
        e.preventDefault();
        try {
            await http.post(`/api/comment/new/${id}`,{
                content: inputs.input1,
                postId: id

            });

        } catch (error) {
            alert("Não foi possível comentar, tente mais tarde novamente");
        }


    }

    return(
        <nav>
            <form method="post" onSubmit={SubmitForm}>
                <TextField 
                    id="standard-basic" 
                    label="Escreva um comentário" 
                    variant="standard" 
                    value={inputs.input1}
                    onChange={e => setInputs(prev => ({...prev, input1:e.target.value}))}
                />
                <Button variant="contained" endIcon={<SendIcon />} type="submit">
                    Send
                </Button>

            </form>
            {comments.map(item =>(
                <div key={item._id}>
                    <p>{item.content}</p>
                </div>
            ))}
        </nav>
    )
}