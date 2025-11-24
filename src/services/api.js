import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api' // Certifique-se que seu Kotlin roda na porta 8080
});

export default api;