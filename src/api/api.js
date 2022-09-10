import axios from "axios";

const URLS = ["https://erick-news-back-end.herokuapp.com/", "http://localhost:8877/" ]


const http = axios.create({
    baseURL: URLS[1]
})


export default http;