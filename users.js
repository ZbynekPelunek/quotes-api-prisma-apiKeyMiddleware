const { Prisma, PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();

const usersRouter = express.Router();

module.exports = usersRouter;

const API_KEY = process.env.API_KEY;

//POST register new user
usersRouter.post("/register", async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	try {
		if(email && password){
            const result = await prisma.users.create({
                data: {
                    email,
                    password,
                    firstName,
                    lastName,
                },
            });
            res.status(201).json(result);
		} else {
			throw 'Email and Password is required'
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ err });
	}	
});