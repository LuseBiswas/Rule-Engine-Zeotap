// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rule-engine-zeotap.onrender.com', // Adjust this to match your backend URL
});

export default instance;
