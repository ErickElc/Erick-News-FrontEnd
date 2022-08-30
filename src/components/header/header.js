import { Link } from "react-router-dom";
import "./header.scss";

export default function Header(){


    return(
        <header>
            <h2>
                <Link to="/">
                    Erick News
                </Link>
            </h2>
            <ul>
                <li>
                    <Link to="/publicar">
                        Cadastrar
                    </Link>
                </li>
                <li>
                    <Link to="/editar">
                        Editar
                    </Link>
                </li>
                <li>
                    <Link to="/excluir">
                        Excluir
                    </Link>
                </li>
            </ul>
        </header>
    )

}