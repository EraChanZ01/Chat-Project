import io from "socket.io-client";
import config from "../../../../config";

class WebSocket {
    constructor(dispatch, getState) {
        this.dispatch = dispatch;
        this.getState = getState;
        this.socket = io(`${config.baseURL}/socket/chat`, {
            cors: {
                origin: "*"
            }
        })
        this.listen();
    }
    listen = () => {
        this.socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
        this.socket.on('connect', () => {
            console.log('Client socket connected')
            this.anotherSubscribes()
        })
    }

}
export default WebSocket