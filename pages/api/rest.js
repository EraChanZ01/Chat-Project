const http = require('./interceptor')

export const checkAuth = () => http.get('/api/auth')
export const loginUser = (data) => http.post('/api/auth/login', data)
export const registerUser = (data) => http.post('api/auth/register', data)
export const getAllUser = (data) => http.get(`api/user/getAll/${data}`)
export const addFriend = (data) => http.post('api/user/addFriend', data)