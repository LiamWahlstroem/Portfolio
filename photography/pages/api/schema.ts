import mongoose from 'mongoose';

interface IUser {
    username: string;
    password: string;
	role: string;
}

interface IImage {
    imageName: string;
    imageURLFull: string;
	imageURLMedium: string;
	imageURLSmall: string;
	alt: string;
	location: string;
    date: string;
	imageCollection: string;
}

interface IImageCollection {
	collectionName: string;
	collectionDate: string;
}

const userSchema = new mongoose.Schema<IUser>({
	username: String,
	password: String,
	role: String,
});

const imageSchema = new mongoose.Schema<IImage>({
	imageName: String,
	imageURLFull: String,
	imageURLMedium: String,
	imageURLSmall: String,
	alt: String,
	location: String,
	date: String,
	imageCollection: String,
});

const imageCollectionSchema = new mongoose.Schema<IImageCollection>({
	collectionName: String,
	collectionDate: String,
});

export const Users = mongoose.models.Users || mongoose.model<IUser>('Users', userSchema, 'Users');

export const Images = mongoose.models.Images || mongoose.model<IImage>('Images', imageSchema, 'Images');

export const ImageCollections = mongoose.models.ImageCollections || mongoose.model<IImageCollection>('ImageCollections', imageCollectionSchema, 'ImageCollections');