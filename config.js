const config = {
    mongo: {
        dbName: process.env.DB_NAME || 'practicChat'
    },
    token: {
        SALT_ROUNDS: 10,
        EXPIRES_TIME: 1000,
        SECRET: 'qwerty'
    }
}

module.exports = config

