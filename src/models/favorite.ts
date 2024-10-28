import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

interface IFavorite extends Document {
  heroId: number;
  name: string;
  image: string;
  users: mongoose.Types.ObjectId[];
}

const schema = new mongoose.Schema<IFavorite>(
  {
    heroId: {
      type: Number,
      required: true,
      unique: true,
      minLength: 3,
    },
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    image: {
      type: String,
      required: true,
      minLength: 2,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

schema.plugin(uniqueValidator);

export default mongoose.model<IFavorite>('Favorite', schema);
