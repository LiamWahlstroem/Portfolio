import mongoose, {Schema} from 'mongoose';
import {object} from "prop-types";

interface IUser {
    username: String;
    displayName: String;
    password: String;
}

interface IImage {
    imageName: String;
    imageURL: String;
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
    date: {type: Date, default: Date.now},
});

export const Users = mongoose.models.Users || mongoose.model<IUser>('Users', userSchema, 'Users')

export const Images = mongoose.models.Images || mongoose.model<IImage>('Images', imageSchema, 'Images')

