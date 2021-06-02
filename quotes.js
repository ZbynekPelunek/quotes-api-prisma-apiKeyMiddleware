const { Prisma, PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();
const API = require('./middleware/apikeys');

const quotesRouter = express.Router();

module.exports = quotesRouter;

//POST new quote
quotesRouter.post("/add", API.validateKey, async (req, res) => {
	const { quote, person, year } = req.body;
	//const apiKey = req.header('x-api-key');

	//console.log(`api key inside header: ${apiKey}`)
	try {
		//if(apiKey !== API_KEY) throw 'Invalid API KEY';
		if(quote === '') throw 'Quote text cannot be empty'

		const result = await prisma.quotes.create({
			data: {
				quote: quote,
				person: person,
				year: year,
			},
		});
		res.status(201).json(result);
	} catch (err) {
		console.log(err);
		//if (err === 'Invalid API KEY') return res.status(403).json({ error: err });
		res.status(400).json({ error: err });
	}
});

//GET all quotes
quotesRouter.get("/all", async (req, res) => {
	const searchString = req.query.person;

	const quotes = await prisma.quotes.findMany({
		where: { person: { contains: searchString } },
	});

	//console.log(quotes);
	res.json(quotes);
});

//GET quote base on author
quotesRouter.get("/", async (req, res) => {
	const searchString = req.query.person || 'Anonymous';

	const quotes = await prisma.quotes.findMany({
		where: { person: { contains: searchString } },
	});

	//console.log(quotes);
	res.json(quotes);
});


//GET random quote
quotesRouter.get('/random', async (req, res, next) => {
    const quote = await prisma.$queryRaw('SELECT * FROM "Quotes" q ORDER BY random() LIMIT 1;')
    
	//console.log(quote);
	res.json(quote);
});

