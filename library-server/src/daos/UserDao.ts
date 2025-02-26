// Import mongoose and related types
import mongoose, { Schema, Document } from 'mongoose';
// Import IUser interface
import { IUser } from '../models/User';

// Extend IUser with mongoose Document
export interface IUserModel extends IUser, Document {};

// Define the user schema
const UserSchema = new Schema({
    type: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    versionKey: false
});

// Export the user model
export default mongoose.model<IUserModel>('User', UserSchema);