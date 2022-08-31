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
                        Criar tópico
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Ver tópicos
                    </Link>
                </li>
            </ul>
        </header>
    )

}