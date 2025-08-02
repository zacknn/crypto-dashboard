import axios from "axios";

export const fetchTopCoin = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 10000, // 10 seconds timeout
});

export const fetchCoinDetail = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 10000, // 10 seconds timeout
});

