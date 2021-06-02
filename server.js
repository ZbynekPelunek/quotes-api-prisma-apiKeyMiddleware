const express = require('express');

const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(express.json());

//Import and mount quotesRouter
const quotesRouter = require('./quotes.js');
app.use('/api/quotes', quotesRouter);

const keysRouter = require('./keys.js');
app.use('/api/key', keysRouter);

app.listen(PORT, () => {
    console.log('Server started and listening on port ' + PORT);
});

app.get('/', (req, res) => {
    //health check route
    res.status(200).send({data: { message: "\"Everything is fine.\" - Server - Just now" }});
});