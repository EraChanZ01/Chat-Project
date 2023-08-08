import io from 'socket.io-client'
import axios from 'axios'
import config from '../../config'


const instance = axios.create({
    baseURL: config.baseURL
})

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers = { ...config.headers, Authorization: token };
        }
        return config
    },
    err => Promise.reject(err)
)

instance.interceptors.response.use(
    response => {
        if (response.data.token) {
            window.localStorage.setItem('token', response.data.token);
        }
        return response
    },
    err => Promise.reject(err)
)

module.exports = instance