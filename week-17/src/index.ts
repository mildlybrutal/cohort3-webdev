import { Client } from "pg";
import express from "express";

const app = express();
app.use(express.json());

const pgClient = new Client(
	"postgresql://neondb_owner:npg_RVvy56cStZIK@ep-damp-river-aeqk2ifq-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

pgClient.connect();

app.post("/signup", async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	const city = req.body.city;
	const country = req.body.country;
	const street = req.body.street;
	const pincode = req.body.pincode;

	try {
		const insertQuery = `INSERT INTO users(username,email,password) VALUES($1,$2,$3,$4,$5);`;

		const addressInsertQuery = `INSERT INTO addresses (city, country,street,pincode,user_id) VALUES ($1,$2,$3);`;

		await pgClient.query("BEGIN;"); //transaction starts here

		const response = await pgClient.query(insertQuery, [
			username,
			email,
			password,
		]); //values to prevent sql injection

		await new Promise((x) => setTimeout(x, 100, 1000)); // stop the control on this line for 100s - crashing the server (experiment)
		const userId = response.rows[0].id;

		const addressInsertResponse = await pgClient.query(addressInsertQuery, [
			city,
			country,
			street,
			pincode,
			userId,
		]);

		await pgClient.query("COMMIT;"); //transaction ends here
		res.json({
			message: "Sign up endpoint hit",
		}).status(200);
	} catch (error) {
		res.json({
			message: "Sign up endpoint error",
		}).status(500);
	}
});

app.get("/metadata", async (req, res) => {
	const id = req.query.id;

	const query1 = `SELECT username,email FROM users WHERE id=$1;`;
	const response1 = await pgClient.query(query1, [id]);

	const query2 = `SELECT * FROM addresses WHERE user_id=$1;`;
	const response2 = await pgClient.query(query2, [id]);

	res.json({
		user: response1.rows[0],
		addresses: response2.rows[0],
	});
});

// Joins

app.get("/better-metadeta", async (req, res) => {
	const id = req.query.id;

	const query = `SELECT users.id , users.username, users.email,addresses.city,addresses.country, addresses.street,addresses.pincode FROM users JOIN addresses ON users.id = addresses.user_id WHERE users.id=$1;`;

	const response = await pgClient.query(query, [id]);

	res.json({
		response,
	});
});

app.listen("3000", () => {
	console.log("Server is on");
});
