const express = require('express');

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const quotesRouter = express.Router();

module.exports = quotesRouter;

//GET random quote
quotesRouter.get('/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({
        quote: randomQuote
    });
});

//GET all quotes or quote base on author
quotesRouter.get('/', (req, res, next) => {
    const queryParams = req.query;
    //check if the query params object is empty
    if(queryParams && Object.keys(queryParams).length === 0 && queryParams.constructor === Object){
        res.send({
            quotes: quotes
        });
    //if not returns quote(s) base on the person query string
    } else {
        res.send({
            quotes: quotes.filter(q => q.person === req.query.person)
        });
    }
});

//POST new quote
quotesRouter.post('/', (req, res, next) => {
    if(req.query.quote && req.query.person){
        quotes.push({
            quote: req.query.quote,
            person: req.query.person
        });
        res.send({
            quote: {
                quote: req.query.quote,
                person: req.query.person
            }
        });
    }else{
        res.status(400).send();
    }
});