import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

interface IUser extends Document {
  username: string;
  name: string;
  passwordHash: string;
  favorites: mongoose.Types.ObjectId[];
}

const schema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    passwordHash: {
      type: String,
      required: true,
      minLength: 3,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite',
      },
    ],
  },
  {
    timestamps: true,
  },
);

schema.plugin(uniqueValidator);

export default mongoose.model<IUser>('User', schema);
