const express = require('express');
const cors = require('cors');

function createServer(controllers, corsOptions) {
    const app = express();

    app.use(cors(corsOptions));
    app.use(express.json());

    controllers.forEach((controller) => {
        app.use(controller.path, controller.handler);
    });

    return app;
}

module.exports = createServer;
