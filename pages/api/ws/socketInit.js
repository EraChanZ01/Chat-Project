import ChatSocket from "./sockets/chatSocket"

export let chatController

export const initSocket = async () => {
    chatController = new ChatSocket()
}