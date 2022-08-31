import Form from "../../components/formulario/form";

export default function Formularios(props){
    return(
        <div>
            <Form editar={props.editar}/>
        </div>
    )
}