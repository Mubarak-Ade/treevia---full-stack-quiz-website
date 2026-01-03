import { InferSchemaType, model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
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
  isOnline: {
    type: Boolean,
    default: false,
  },
  profilePic: {
    type: String,
  },
  bio: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type User = InferSchemaType<typeof UserSchema>

const User = model<User>('User', UserSchema);

export default User;
