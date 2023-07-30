const next = require('next')
const express = require('express')
const mongoose = require('mongoose');
const config = require('../config')
const router = require('./router/router')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

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

app.prepare().then(() => {
    const server = express()

    server.use(express.json())
    server.use('/api', router)
    server.get('*', (req, res) => {
        return handle(req, res);
    });
    startDataBase()

    server.listen(PORT, () => {
        console.log(`Server started in PORT:${PORT}`)
    })
})


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



const PORT = process.env.PORT || 3000
