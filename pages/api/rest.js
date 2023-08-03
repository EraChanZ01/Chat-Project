const http = require('./interceptor')

export const checkAuth = () => http.get('/api/auth')
export const loginUser = (data) => http.post('/api/auth/login', data)
export const registerUser = (data) => http.post('api/auth/register', data)
export const getAllUser = () => http.get('api/auth/register')