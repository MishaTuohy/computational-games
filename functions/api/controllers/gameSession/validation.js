const { checkSchema } = require('express-validator');

const createGameValidationRules = checkSchema({
    gameName: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Game name is required.',
        },
        isString: {
            errorMessage: 'Game name must be a string.',
        },
    },
    gameState: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Game state is required.',
        },
        isObject: {
            errorMessage: 'Game state must be an object.',
        },
    },
    participants: {
        in: ['body'],
        isArray: {
            errorMessage: 'Participants must be an array.',
        },
    },
    maxParticipants: {
        in: ['body'],
        isInt: {
            errorMessage: 'Max participants must be an integer.',
        },
    },
    finished: {
        in: ['body'],
        isBoolean: {
            errorMessage: 'Finished must be a boolean.',
        },
    },
    timeCreated: {
        in: ['body'],
        isString: {
            errorMessage: 'Time created must be a string.',
        },
    },
    updatedAt: {
        in: ['body'],
        isString: {
            errorMessage: 'Updated at must be a string.',
        },
    },
});

const updateGameValidationRules = checkSchema({
    gameName: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Game name must be a string.',
        },
    },
    participants: {
        in: ['body'],
        optional: true,
        isArray: {
            errorMessage: 'Participants must be an array.',
        },
    },
    maxParticipants: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: 'Max participants must be an integer.',
        },
    },
    finished: {
        in: ['body'],
        optional: true,
        isBoolean: {
            errorMessage: 'Finished must be a boolean.',
        },
    },
    timeCreated: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Time created must be a string.',
        },
    },
    updatedAt: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Updated at must be a string.',
        },
    },
});

module.exports = {
    createGameValidationRules,
    updateGameValidationRules,
};