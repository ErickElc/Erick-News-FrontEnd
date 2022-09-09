import { TextField , Button} from "@mui/material"
import { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
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
           const dado = res.data
            const dados = [];
            for(let i in dado){
                if(dado[i].postId === id){
                    dados.push(dado[i]);
                }
            }
            setComments(dados);
        }).catch(err => {
            alert('/login');
            console.log(err);
        })
    },[id])
    async function SubmitForm(e){
        e.preventDefault();
        try {
            await http.post(`/api/comment/new/${id}`,{
                content: inputs.input1,
                postId: id
            });
            setInputs({input1: ''});
            window.location.reload();

        } catch (error) {
            alert("Não foi possível comentar, tente mais tarde novamente");
        }


    }
    async function deleteComment(commentId){
        try {
            await http.delete(`/api/comments/delete/${commentId}`); 
            window.location.reload();
        } catch (error) {
            console.log(`Houve um erro ${error}`);
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
                    onChange={e => setInputs(prev => ({...prev, input1: e.target.value}))}
                    maxLength={30}
                />
                <Button variant="contained" endIcon={<SendIcon />} type="submit">
                    Send
                </Button>
            </form>

            {comments.map(item =>(
                <div key={item._id}>
                    <Avatar src="/broken-image.jpg"  className="avatar"/>
                    <div>
                        <div className="containerText"><p>{item.content}</p></div>
                        <Tooltip title="Delete" onClick={()=> {deleteComment(item._id)}}>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            ))}
        </nav>
    )
}