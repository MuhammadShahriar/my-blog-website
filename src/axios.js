import axios from 'axios';

const instance = axios.create({
    baseURL: "https://609925a599011f001714034f.mockapi.io/api/v1/Posts",
});

export default instance;