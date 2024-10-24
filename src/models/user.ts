import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

interface IUser extends Document {
  username: string;
  name: string;
  passwordHash: string;
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
  },
  {
    timestamps: true,
  },
);

schema.plugin(uniqueValidator);

export default mongoose.model<IUser>('User', schema);
