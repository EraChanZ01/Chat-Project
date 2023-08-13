import WebSocket from "./webSocket";
import { addMessage } from '../../../../redux/slice/contactSlice'
import CONSTANTS from "../../../../constants";

class ChatSocket extends WebSocket {
    constructor(dispatch, getState) {
        super(dispatch, getState);
    }

    anotherSubscribes = () => {
        this.onNewMessage();
    };

    onNewMessage = () => {
        this.socket.on(CONSTANTS.NEW_MESSAGE, data => {
            this.dispatch(addMessage(data.message))
        });
    };

    subscribeChat = id => {
        this.socket.emit(CONSTANTS.SOCKET_SUBSCRIBE_CHAT, id);
    };

    unsubscribeChat = id => {
        this.socket.emit(CONSTANTS.SOCKET_UNSUBSCRIBE_CHAT, id);
    };
}

export default ChatSocket