const errorHandler = (Error, req, res, next) => {
    res.status(Error.status || 500);
    res.json({
        message: Error.message || 'Oops, Something went wrong :/',
        stack : process.env.NODE_ENV === 'development' ? Error.stack : null
    })
    next()
};

module.exports = errorHandler;