import WebSocket from "./webSocket";

class ChatSocket extends WebSocket {
    constructor() {
        super();
    }

    anotherSubscribes = () => {
        this.onNewMessage();
    };

    onNewMessage = () => {
        this.socket.on('newMessage', data => {
            console.log(data)
        });
    };

    subscribeChat = id => {
        this.socket.emit('subscribeChat', id);
    };

    unsubscribeChat = id => {
        this.socket.emit('unsubscribeChat', id);
    };
}

export default ChatSocket