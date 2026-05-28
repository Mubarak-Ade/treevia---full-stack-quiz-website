import mongoose, { Document, InferSchemaType, model, Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        profilePic: {
            type: String,
            trim: true,
        },
        bio: {
            type: String,
            default: '',
            trim: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpires: {
            type: Date,
        },
    },
    { timestamps: true }
);


export type IUser = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

const User = model<IUser>('User', UserSchema);

export default User;
