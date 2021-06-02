const { Prisma, PrismaClient } = require("@prisma/client");
const express = require("express");

const API = require('./middleware/apikeys');
const prisma = new PrismaClient();

const keysRouter = express.Router();

module.exports = keysRouter;

//GET new key and save it to database
keysRouter.get("/generate", async (req, res) => {

	console.log('request received');
	const apikey = await API.genKey();
	console.log(`api key generated: ${apikey}`);
	try {
        
		const result = await prisma.apikeys.create({
                data: {
                    apikey,
                },
            });
        res.status(201).json(result);
	
	} catch (err) {
		console.log(err);
		res.status(400).json({ err });
	}	
});