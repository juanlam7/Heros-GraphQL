import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import { ResolverParent, IError } from '../../interfaces/interfaces';

const JWT_SECRET = process.env.JWT_SECRET!;

export const userMutations = {
  createUser: async (
    _: ResolverParent,
    args: { username: string; name: string; password: string },
  ) => {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(args.password, saltRounds);

    const user = new User({
      username: args.username,
      name: args.name,
      passwordHash: hashPassword,
    });

    return user.save().catch((error: IError) => {
      throw new GraphQLError(error.message, {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      });
    });
  },
  login: async (
    _: ResolverParent,
    args: { username: string; password: string },
  ) => {
    const user = await User.findOne({ username: args.username });

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(args.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      throw new GraphQLError('Wrong credentials', {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    return {
      value: jwt.sign(userForToken, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 7,
      }),
    };
  },
  refreshToken: async (_: ResolverParent, args: { refreshToken: string }) => {
    // Verify the refresh token
    let decodedToken: JwtPayload;
    try {
      decodedToken = jwt.verify(args.refreshToken, JWT_SECRET) as JwtPayload;
    } catch (error) {
      throw new GraphQLError('Invalid refresh token', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // Find the user associated with the token
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // Create a new token
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    return {
      value: jwt.sign(userForToken, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 7, // Token valid for 7 days
      }),
    };
  },
};
