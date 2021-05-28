const express = require('express');

const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(express.json());

//Import and mount quotesRouter
const quotesRouter = require('./quotes.js');
app.use('/api/quotes', quotesRouter);

const usersRouter = require('./users.js');
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log('Server started and listening on port ' + PORT);
});

app.get('/', (req, res) => {
    //health check route
    res.status(200).send({data: { message: "\"Everything is fine.\" - Server - Just now" }});
});