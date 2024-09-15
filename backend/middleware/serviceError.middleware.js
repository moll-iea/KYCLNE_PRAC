const serviceError = (err, req, res, next) => {
    console.log('Here is an Error Middleware');
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If the status code is 200, set it to 500
    res.status(statusCode);
    res.json({ error: err.message, stack: process.env.NODE_ENV === 'development' ? err.stack : null });
}

module.exports = serviceError;