import http from "../api/api";



export const setUserLocalStorage = (user) =>{
    localStorage.setItem('u', JSON.stringify(user));
}

export const getUserLocalStorage = () =>{
    const json = localStorage.getItem('u');

    if(!json) return null;

    const user = JSON.parse(json);

    return user ?? null;
}

export async function LoginRequest(email, password) {
    try {
        const request = await http.post('api/users/login', {email, password});
        return request;
    } catch (error) {
        return null;
    }
}