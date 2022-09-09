import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import http from "../../api/api";

export default function ListaPubli(props){

    const [creatorData, setCreatorData] = useState({});
    
    const rota = `/topic/${props.post._id}`;
    
    const dateTemplate = new Date(props.post.date);
    const dateDay = (dateTemplate).toDateString();

    useEffect(()=>{
        http.get(`api/posts/${props.post?._id}`).then(res => {
            setCreatorData(res.data);
        })
        .catch(err => console.log(err))
    },[props]);
    return(
        <div key={props.post._id} className="container-noticias">
            <h2>
                <Link to={rota}>
                    <span>{props.index}.</span>
                    {props.post.title}
                </Link>
            </h2>
            <p id="tags"><span>tags: </span>{props.post.tags}</p>
            <p id="date">{dateDay}</p>
            <p id="autor">By:<span>{creatorData.autor?.name}</span></p>
        </div>
    )
}
