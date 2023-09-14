const mongoose = require('mongoose');
import {Contact} from './schema';

const AddContactRequest = async(req: any, res: any) => {
	mongoose.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_URI}`,
		{
			useNewURLParser: true,
			useUnifiedTopology: true,
		},
	);

	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error: '));
	db.once('open', function () {
		return db;
	});

	const data = new Contact({
		name: req.body.name,
		email: req.body.mail,
		subject: req.body.subject,
		message: req.body.message,
	});

	await data.save((err: any) => {
		err ? res.status(500).end() : res.status(200).end();
	});
	db.close();
};

export default AddContactRequest;