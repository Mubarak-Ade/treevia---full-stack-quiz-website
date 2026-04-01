import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface ISession {
    user: string,
    refreshTokenHash: string,
    userAgent: string,
    ip: string,
    expiresAt: Date
}

const sessionSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    refreshTokenHash: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        default: "unknown"
    },
    ip: {
        type: String,
        default: "unknown"
    },
    expiresAt: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true})

const Session: Model<ISession> = model<ISession>("Session", sessionSchema)

export default Session