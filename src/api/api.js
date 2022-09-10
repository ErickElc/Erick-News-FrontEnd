import axios from "axios";

const URLS = ["https://erick-news-back-end2.herokuapp.com/", "http://localhost:8877/" ];


const http = axios.create({
    baseURL: URLS[0]
});


export default http;