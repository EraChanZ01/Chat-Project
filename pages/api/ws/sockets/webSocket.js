import io from "socket.io-client";
import config from "../../../../config";

class WebSocket {
    constructor() {
        this.socket = io(`${config.baseURL}/socket`, {
            origins: 'localhost:*',
        })
        this.listen();
    }
    listen = () => {
        this.socket.on('connect', () => {
            console.log('socket connected')

        })
    }

}
export default WebSocket