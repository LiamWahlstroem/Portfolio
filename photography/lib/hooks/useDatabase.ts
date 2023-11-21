import mongoose from 'mongoose';

const useDatabase = async () => {
	await mongoose.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_URI}`,
	);

	const db = mongoose.connection;
	db.on('error', () => {});
	db.once('open', () => {});
};

export default useDatabase;