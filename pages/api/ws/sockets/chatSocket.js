import WebSocket from "./webSocket";
import { addMessage } from "../../../../redux/slice/contactSlice";

class ChatSocket extends WebSocket {
    constructor(dispatch, getState) {
        super(dispatch, getState);
    }

    anotherSubscribes = () => {
        this.onNewMessage();
    };

    onNewMessage = () => {
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