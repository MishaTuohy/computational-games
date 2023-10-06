function handleErrors(err, res) {
    console.error(err);

    if (err.statusCode) {
        res.status(err.statusCode).send({ error: err.message });
    } else {
        const errorMessage = process.env.NODE_ENV === 'production' 
            ? 'Internal Server Error' 
            : err.message;

        const errorDetails = process.env.NODE_ENV === 'production' 
            ? {}
            : { stack: err.stack };

        res.status(500).send({ error: errorMessage, ...errorDetails });
    }
}

module.exports = handleErrors;
