import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 10000, // 10 seconds timeout
});

export default api;