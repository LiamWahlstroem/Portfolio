import mongoose from 'mongoose';

interface IUser {
    username: string;
    displayName: string;
    password: string;
}

interface IImage {
    imageName: string;
    imageURL: string;
    category: string;
    date: Date;
}

const userSchema = new mongoose.Schema<IUser>({
	username: String,
	displayName: String,
	password: String,
});

const imageSchema = new mongoose.Schema<IImage>({
	imageName: String,
	imageURL: String,
	category: String,
	date: {type: Date, default: Date.now},
});

export const Users = mongoose.models.Users || mongoose.model<IUser>('Users', userSchema, 'Users');

export const Images = mongoose.models.Images || mongoose.model<IImage>('Images', imageSchema, 'Images');

