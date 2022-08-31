import axios from "axios";


const http = axios.create({
    baseURL:"https://erick-news-back-end.herokuapp.com/"
})


export default http;