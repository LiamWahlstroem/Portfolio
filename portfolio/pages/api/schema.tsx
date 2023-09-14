import {Schema, model, models} from 'mongoose';

interface IContact {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const contactSchema = new Schema<IContact>({
	name: String,
	email: String,
	subject: String,
	message: String,
});

export const Contact = models.Contact || model<IContact>('Contact', contactSchema, 'Contact');

interface ILeaderboard {
    name: string;
    date: Date;
    score: number;
}

const leaderboardSchema = new Schema<ILeaderboard>({
	name: String,
	date: {type: Date, default: Date.now},
	score: Number,
});

export const Leaderboard = models.Leaderboard || model<ILeaderboard>('Leaderboard', contactSchema, 'Leaderboard');