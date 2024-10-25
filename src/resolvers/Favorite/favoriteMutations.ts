import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import {
  IError,
  ResolverParent,
  ResolverContext,
} from '../../interfaces/interfaces';
import Favorite from '../../models/favorite';

export const favoriteMutations = {
  addFavorite: async (
    _: ResolverParent,
    args: { heroId: number; name: string },
    context: ResolverContext,
  ) => {
    const { currentUser } = context;
    if (!currentUser)
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });

    const favorite = new Favorite({ ...args });

    try {
      favorite.users.concat(currentUser);
      await favorite.save();

      currentUser.favorites = currentUser.favorites.concat(favorite);
      await currentUser.save();
    } catch (error) {
      const typedError = error as IError;
      throw new GraphQLError(typedError.message, {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      });
    }
    const favoriteSend = await Favorite.findById(favorite.id).populate('users');
    return favoriteSend;
  },
  deleteFavorite: async (
    _: ResolverParent,
    args: { heroId: number },
    context: ResolverContext,
  ) => {
    const { currentUser } = context;
    if (!currentUser)
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });

    const favoriteDeleted = await Favorite.findOneAndDelete({
      heroId: args.heroId,
    });
    if (!favoriteDeleted)
      throw new Error('No favorite with given ID Found for the user');

    return 'Favorite deleted';
  },
};
