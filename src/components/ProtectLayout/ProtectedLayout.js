/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect} from "react";
import { useNavigate } from "react-router";
import http from "../../api/api";
import { useAuth } from "../../auth/useAuth";
import { getUserLocalStorage } from "../../auth/util";



export function ProtectedLayoutNoLogged( {children} ){
    const auth = useAuth();
    const navigate = useNavigate();
    function Verificar(data){
        if(data === true){
            navigate('/');
        }
    }
    useEffect(()=>{
        auth.VerifyLoggin().then(res => {
            Verificar(res)
        })
        .catch(() => {})
    },[auth])
    return children;
}

export function ProtectedLayoutLogged( {children} ){
    const auth = useAuth();
    const navigate = useNavigate();
    function Verificar(data){
        if(data === false){
            navigate('/');
        }
    }
    useEffect(()=>{
        auth.VerifyLoggin().then(res => {
            Verificar(res)
        })
        .catch(() => {})
    },[auth])
    return children;
}
export function NoHaveAccess({children, ...props}){
    const navigate = useNavigate();
    const User = getUserLocalStorage();
    function verificarAcesso(post){
        if(User.email !== post.autor?.email && props?.editar){
            return navigate('/');
        }
        return true;
    }
    useEffect(()=>{
        http.get(`api/posts/${props?.id}`).then(res => {
            verificarAcesso(res.data);
        }).catch(err => {
            console.log(err);
        })
    },[])
    return children;
}