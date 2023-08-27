const http = require('./interceptor')

export const checkAuth = () => http.get('/auth')
export const loginUser = (data) => http.post('/auth/login', data)
export const registerUser = (data) => http.post('/auth/register', data)
export const addFriend = (data) => http.post('/chat/addFriend', data)
export const getChats = () => http.get(`/chat`)
export const getOneChat = (data) => http.get(`/chat/${data}`)
export const sendMessage = (data) => http.post('/chat/sendMessage', data)