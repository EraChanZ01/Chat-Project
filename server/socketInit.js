const { Server } = require('socket.io')
const ChatController = require('./controller/sockets/chatController')

let chatController;

module.exports.createConnection = (httpServer) => {
    const io = new Server(httpServer, { cors: { origin: '*', } });
    chatController = new ChatController()
    chatController.connect('api/socket/chat', io)
}

module.exports.getChatController = () => {
    return chatController;
  };