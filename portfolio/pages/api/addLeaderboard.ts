const mongoose = require('mongoose');
import {Leaderboard} from './schema';

const AddLeaderboard = async(req: any, res: any) => {
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

	const data = new Leaderboard({
		name: req.body.name,
		score: req.body.score,
	});

	await data.save((err: any) => {
		err ? res.status(500).end() : res.status(200).end();
	});
	db.close();
};

export default AddLeaderboard;