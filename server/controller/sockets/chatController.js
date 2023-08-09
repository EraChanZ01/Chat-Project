const WebSocket = require('./webSocket');

class ChatController extends WebSocket {

    anotherSubscribes(socket) {
        this.onSubscribeChat(socket);
        this.onUnsubscribeChat(socket);
    }

    onSubscribeChat(socket) {
        socket.on('subscribeChat', (id) => {
            socket.join(parseInt(id));
        });
    }

    onUnsubscribeChat(socket) {
        socket.on('unsubscribeChat', (id) => {
            socket.join(parseInt(id));
        });
    }

    emitNewMessage(target, message) {
        console.log(message,"server")
        this.io.to(parseInt(target)).emit('newMessage', { message })
    }

}
module.exports = ChatController