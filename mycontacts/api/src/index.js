const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '7200');
    next();
})
app.use(routes);
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
    console.log(error);
    response.sendStatus(500);
});

app.listen(3001, () => console.log('💡 Server started at http://localhost:3001'));