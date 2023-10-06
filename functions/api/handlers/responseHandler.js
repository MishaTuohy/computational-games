function asyncHandler(controllerFn) {
    return async (req, res, next) => {
        try {
            await controllerFn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

function success(res, data, status = 200) {
    res.status(status).json(data);
}

function error(res, message, status = 400) {
    res.status(status).json({ error: message });
}

function notFound(res, message = 'Not Found') {
    error(res, message, 404);
}

function custom(res, data, status) {
    res.status(status).json(data);
}

module.exports = {
    asyncHandler,
    success,
    error,
    notFound,
    custom,
};
