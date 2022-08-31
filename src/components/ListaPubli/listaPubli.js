import { Link } from "react-router-dom"

export default function ListaPubli(props){

    const rota = `/topic/${props.post._id}`
    
    return(
        <div key={props.post._id} className="container-noticias">
            <h2>
                <Link to={rota}>
                    <span>{props.index}.</span>
                    {props.post.title}
                </Link>
            </h2>
            <p id="tags"><span>tags: </span>{props.post.tags}</p>
        </div>
    )
}
