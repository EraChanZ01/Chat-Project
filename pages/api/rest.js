const http = require('./interceptor')

export const checkAuth = () => http.get('/auth')
export const loginUser = (data) => http.post('/auth/login', data)
export const registerUser = (data) => http.post('/auth/register', data)
export const getAllUser = (data) => http.get(`/user/getAll/${data}`)
export const addFriend = (data) => http.post('/user/addFriend', data)
export const getChats = () => http.get(`/chat`)