/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import "./header.scss";

export default function Header(){
    const auth = useAuth();
    const [logged, setLogged] = useState(false);
    function Logout(){
        auth.logout();
        window.location.reload();
    }
    useEffect(()=>{
        auth.VerifyLoggin().then(res => {
            setLogged(res);
        }).catch(() => {setLogged(false)});
    },[])
    return(
        <header>
            <h2>
                <Link to="/">
                   Erick News
                </Link>
            </h2>
                {logged === true ? (
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
                        <li onClick={Logout}>
                            <Link to="/login">
                                Logout
                            </Link>
                        </li>
                    </ul>
                    ) : (
                    <ul>
                        <li>
                            <Link to="/">
                                Ver tópicos
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/cadastrar">
                                Cadastrar Usuário
                            </Link>
                        </li>
                    </ul>
                    )
                }
        </header>
    )

}