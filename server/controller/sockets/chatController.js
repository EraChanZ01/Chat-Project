const WebSocket = require('./webSocket');
const CONSTANTS = require('../../../constants')

class ChatController extends WebSocket {

    anotherSubscribes(socket) {
        this.onSubscribeChat(socket);
        this.onUnsubscribeChat(socket);
    }

    onSubscribeChat(socket) {
        socket.on(CONSTANTS.SOCKET_SUBSCRIBE_CHAT, (id) => {
            socket.join(parseInt(id));
        });
    }

    onUnsubscribeChat(socket) {
        socket.on(CONSTANTS.SOCKET_UNSUBSCRIBE_CHAT, (id) => {
            socket.join(parseInt(id));
        });
    }

    emitNewMessage(target, message) {
        this.io.to(parseInt(target)).emit(CONSTANTS.NEW_MESSAGE, { message })
    }

}
module.exports = ChatController