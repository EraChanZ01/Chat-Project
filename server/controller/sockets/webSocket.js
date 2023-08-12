class WebSocket {

    connect(namespace, io) {
        this.io = io.of(namespace);
        this.listen();
    }

    listen() {
        this.io.on('connection', socket => {
            console.log("Server Socket connected")
            this.onSubscribe(socket);
            this.onUnsubscribe(socket);
            this.anotherSubscribes(socket);
        })
    }

    anotherSubscribes(socket) {

    }

    onSubscribe(socket) {
        socket.on("subscribe", (id) => {
            socket.join(id);
        });
    }

    onUnsubscribe(socket) {
        socket.on("socketUnsubscribe", (id) => {
            socket.leave(id);
        });
    }
}

module.exports = WebSocket