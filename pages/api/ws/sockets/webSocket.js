import io from "socket.io-client";
import config from "../../../../config";

class WebSocket {
    constructor(dispatch, getState) {
        this.dispatch = dispatch;
        this.getState = getState;
        console.log()
        this.socket = io(process.env.NODE_ENV === 'production' ? process.env.URL_SOCKET_PRODUCT : process.env.URL_SOCKET_DEV, {
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