import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ROUTE_NAME } from '../../router'

const requestConfig : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
})

// Add a request interceptor
requestConfig.interceptors.request.use(function (config: InternalAxiosRequestConfig<any>) {
    // Do something before request is sent
    if (config.withCredentials) {
        config.headers['access_token'] = localStorage?.getItem('access_token')
    }
    const { withCredentials, ...rest } = config
    return { ...rest }
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
requestConfig.interceptors.response.use(function (response: AxiosResponse<any, any>) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('access_token');
        window.location.href = ROUTE_NAME.LOGIN;
    }
    return Promise.reject(error)
})

export default requestConfig