import axios from "axios";


const http = axios.create({
    baseURL:"http://localhost:8877"
})


export default http;