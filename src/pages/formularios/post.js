import Form from "../../components/formulario/form";
import { ProtectedLayoutLogged } from "../../components/ProtectLayout/ProtectedLayout";
import { ModalProvider } from "../../context/modalContext";

export default function Formularios(props){
    return(
        <div>
            <ModalProvider>
                <ProtectedLayoutLogged>
                    <Form editar={props.editar}/>   
                </ProtectedLayoutLogged>
            </ModalProvider>
        </div>
    )
}