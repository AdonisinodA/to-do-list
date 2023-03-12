import axios from 'axios';

const api = axios.create({
    baseURL: 'https://to-do-back-ace.herokuapp.com/'
        // baseURL: 'http://localhost:3001/'
})
export default api;