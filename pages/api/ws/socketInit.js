import ChatSocket from "./sockets/chatSocket"

export let chatController

export const initSocket = async (store) => {
    chatController = new ChatSocket(store.dispatch,store.getState)
    return store
}