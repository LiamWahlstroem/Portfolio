import mongoose from "mongoose";

const useDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_URI}`,
        {
            useNewURLParser: true,
            useUnifiedTopology: true,
        },
    );

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function () {
        console.log('Connected successfully');
    });

    return db;
}

export default useDatabase;