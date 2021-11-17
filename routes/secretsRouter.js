const express = require('express');
const app = express();

const secretsRouter = express.Router();

secretsRouter.route('/')
.get((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.send(`<html><body><h1>Hello World!</h1></body></html>`);
})

module.exports = secretsRouter;
