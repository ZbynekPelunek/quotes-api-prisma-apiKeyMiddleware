const { Prisma, PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();

const quotesRouter = express.Router();

module.exports = quotesRouter;

//POST new quote
quotesRouter.post("/add", async (req, res) => {
	const { quote, person, year } = req.body;
	try {
		const result = await prisma.quotes.create({
			data: {
				quote: quote,
				person: person,
				year: year,
			},
		});
		res.status(200).json(result);
	} catch (err) {
		console.log(err);
		res.status(404).json({ err });
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

