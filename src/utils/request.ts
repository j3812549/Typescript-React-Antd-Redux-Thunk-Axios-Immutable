import axios from 'axios';
import { fetchUrl } from '../config'

const service = axios.create({
    baseURL: fetchUrl
});

// 添加请求拦截器
service.interceptors.request.use(config => {
    return config;
}, error => Promise.reject(error)
);

// 添加响应拦截器
service.interceptors.response.use(response => {
    return response;
}, error => Promise.reject(error));

export default service
