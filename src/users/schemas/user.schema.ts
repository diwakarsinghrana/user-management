import { Schema, Document } from 'mongoose';

export interface User {
    _id: string;
    name: string;
    surname: string;
    username: string;
    birthdate: Date;
    blocked: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    birthdate: { type: Date, required: true },
    blocked: { type: Boolean, default: false },
});
