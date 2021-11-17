const express = require('express');
const app = express();

const port =  3000;

const secretsRouter = require('./routes/secretsRouter');

function auth(req, res, next) {
    console.log(req.headers);
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        const err = new Error('You are not authorized');
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        next(err);
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user === 'jbond' && pass === 'AstonMartin007') {
       return next();
    } else {
        const err = new Error('You are not authorized');
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        next(err);
    }
 }


app.use(auth);
app.use('/secrets', secretsRouter);

app.get('/', (req, res) => {
    //console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.send(`<html><body><h1>index</h1></body></html>`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}/`);
})
