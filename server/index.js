const http = require('http')
const next = require('next');
const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const router = require('./router/router');
const socketInit = require('./socketInit');
const handlerError = require('./Errors/handler')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler();

const startDataBase = async () => {
    console.info('Starting application');
    let connectionString = null;
    try {
        console.info('Initializing database ...');
        connectionString = connectToMongoDb(
            `mongodb://127.0.0.1:27017/${config.mongo.dbName}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (e) {
        console.log(e)
    }
}

nextApp.prepare().then(() => {
    const app = express()
    const server = http.createServer(app)

    app.use(express.json())
    app.use('/api', router)
    app.get('*', (req, res) => {
        return handle(req, res);
    });
    startDataBase()
    app.use(handlerError);



    server.listen(PORT, () => {
        console.log(`Server started in PORT:${PORT}`)
        socketInit.createConnection(server)
    })

});




const connectToMongoDb = (uri, options) => {
    mongoose.connect(uri, options);

    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });

    mongoose.connection.once('open', function () {
        console.info('MongoDB is connected');
    });

    return mongoose.connection;
}


