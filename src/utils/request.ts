import axios from 'axios';
import { fetchUrl } from 'src/config'

const service = axios.create({
    baseURL: fetchUrl
});

// 添加请求拦截器
service.interceptors.request.use(config => {
    console.log(fetchUrl)
    console.log(process.env)
    console.log(process.env.BASE_PORT)
    console.log(global)
    return config;
}, error => Promise.reject(error)
);

// 添加响应拦截器
service.interceptors.response.use(response => {
    return response.data;
}, error => Promise.reject(error));

export default service
