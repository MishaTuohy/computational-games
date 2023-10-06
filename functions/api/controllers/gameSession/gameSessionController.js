const express = require('express');
const router = express.Router();
const handleErrors = require('../../handlers/handleErrors');
const { asyncHandler, success, notFound } = require('../../handlers/responseHandler');
const { validationMiddleware } = require('../../handlers/requestHandler');
const { createGameValidationRules, updateGameValidationRules } = require('./validation');
const DataModel = require('../../dataModel');

const gameSessionModel = new DataModel('gameSessions');

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const result = await gameSessionModel.getAll();
        success(res, result);
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const result = await gameSessionModel.getById(req.params.id);
        if (!result) {
            return notFound(res);
        }
        success(res, result);
    })
);

router.post(
    '/',
    validationMiddleware(createGameValidationRules),
    asyncHandler(async (req, res) => {
        const result = await gameSessionModel.create(req.body);
        res.status(201).json(result);
    })
);

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const result = await gameSessionModel.delete(req.params.id);
        if (!result) {
            return notFound(res);
        }
        success(res, null, 204);
    })
);

router.patch(
    '/:id',
    validationMiddleware(updateGameValidationRules),
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        const doc = await gameSessionModel.getById(id);
        if (!doc) {
            return notFound(res);
        }

        const updatedDoc = { ...doc, ...data };
        const updateResult = await gameSessionModel.update(id, updatedDoc);
        if (!updateResult) {
            return notFound(res);
        }

        success(res, updatedDoc);
    })
);

router.put(
    '/:id',
    validationMiddleware(updateGameValidationRules),
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        const doc = await gameSessionModel.getById(id);
        if (!doc) {
            return notFound(res);
        }

        const updatedDoc = { ...doc, ...data };
        const updateResult = await gameSessionModel.update(id, updatedDoc);
        if (!updateResult) {
            return notFound(res);
        }

        const result = await gameSessionModel.getById(id);
        success(res, result);
    })
);

router.use(handleErrors);

module.exports = router;