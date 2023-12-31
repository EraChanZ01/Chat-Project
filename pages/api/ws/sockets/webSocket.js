import io from "socket.io-client";
import config from "../../../../config";

class WebSocket {
    constructor(dispatch, getState) {
        this.dispatch = dispatch;
        this.getState = getState;
        this.socket = io(`ws://localhost:3000/api/socket`, {
            origins: '*',
        })
        this.listen();
    }
    listen = () => {
        this.socket.on('connect', () => {
            console.log('socket connected')
            this.anotherSubscribes()
        })
    }
}
export default WebSocket