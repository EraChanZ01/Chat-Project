const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const config = require('../../config')
const jwtSign = promisify(jwt.sign)



module.exports.checkAuth = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw 'err'
        }
        const tokenData = await jwt.verify(accessToken, config.token.SECRET)
        const userFind = await db.User.findOne({
            where: { id: tokenData.id },
            include: [
                {
                    model: db.UserFavoriteProducts,
                    as: "favoriteProduct",

                }
            ]
        })
        res.status(200).send({ data: userFind })
    } catch (e) {
        next(new TokenError('token error'))
    }
}

module.exports.verefyToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw 'not accessToken'
        }
        req.tokenData = await jwt.verify(accessToken, config.token.SECRET)
        next()
    } catch (e) {
        next(e)
    }
}

module.exports.createdToken = async (
    {
        _id,
        phoneNumber,
        password,
    }) => await jwtSign(
        {
            _id,
            phoneNumber,
            password
        },
        config.token.SECRET,
        {
            expiresIn: config.token.EXPIRES_TIME
        }
    )