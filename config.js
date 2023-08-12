const config = {
    mongo: {
        dbName: 'practicChat'
    },
    token: {
        SALT_ROUNDS: 10,
        EXPIRES_TIME: 1000,
        SECRET: 'qwerty'
    },
    baseURL: 'http://localhost:3000/api'
    
}

module.exports = config

