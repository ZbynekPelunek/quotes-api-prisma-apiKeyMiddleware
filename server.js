const express = require('express');

const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(express.json());

//Import and mount quotesRouter
const quotesRouter = require('./quotes.js');
app.use('/api/quotes', quotesRouter);

app.listen(PORT, () => {
    console.log('Server started and listening on port ' + PORT);
});