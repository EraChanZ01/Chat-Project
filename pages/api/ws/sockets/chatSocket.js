import WebSocket from "./webSocket";

class ChatSocket extends WebSocket {
    constructor(dispatch, getState) {
        super(dispatch, getState);
    }

    anotherSubscribes = () => {
        console.log(123)
        this.onNewMessage();
    };

    onNewMessage = () => {
        console.log(123321)
        this.socket.on('newMessage', data => {
            this.dispatch(addMessage(data.message))
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