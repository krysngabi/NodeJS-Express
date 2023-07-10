const errorMiddleware = ( err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    console.log('Environment ' + process.env.NODE_ENV)
    res.json({ message : err.nessage, stack: process.env.NODE_ENV  === "development" ? err.stack : null})
    next()
}

module.exports = errorMiddleware