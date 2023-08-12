module.exports = (err, req, res, next) => {
    res.status(err.code).send(err.message)
}