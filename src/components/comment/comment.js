/* eslint-disable react-hooks/exhaustive-deps */
import { getUserLocalStorage } from "../../auth/util";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { TextField , Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import http from "../../api/api";


export default function Comment(props){
    const [comments, setComments] = useState([]);
    const [inputs, setInputs] = useState({
        input1: '',
    })
    const User = getUserLocalStorage();
    const {id} = useParams();
    const [user, setUser] = useState({});
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
        }).catch(err => {
            console.log(err);
        })
    },[id]);
    useEffect(()=>{
        http.post('api/users/data',{
            token: User?.token,
            email: User?.email
        }).then(res =>{
            setUser(res.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    async function SubmitForm(e){
        e.preventDefault();
        try {
            await http.post(`/api/comments/new/${id}`,{
                content: inputs.input1,
                postId: id,
                userId: user._id,
                email:  User.email,
                token: User.token
            });
            setInputs({input1: ''});
            window.location.reload();
        } catch (error) {
            alert("Não foi possível comentar, tente mais tarde novamente");
        }
    }
    async function deleteComment(commentId){
        try {
            await http.post(`/api/comments/delete/${commentId}`,{
                token: User.token,
                email: User.email
            }); 
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
                    <p>{item.userId?.name}: {item.content}</p>
                    <div>
                        {item.userId?.email === User?.email ? (
                            <Tooltip title="Delete" className="delete" onClick={()=> {deleteComment(item._id)}}>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                        ):('')}
                    </div>
                </div>
            ))}
        </nav>
    )
}