import { GraphQLError } from 'graphql';
import { ResolverContext, ResolverParent } from '../../interfaces/interfaces';
import Favorite from '../../models/favorite';

export const favoriteQueries = {
  favoriteCount: () => Favorite.collection.countDocuments(),
  allFavorites: async (
    _: ResolverParent,
    __: ResolverParent,
    context: ResolverContext,
  ) => {
    const { currentUser } = context;
    if (!currentUser)
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });

    return Favorite.find({ users: currentUser._id }).populate('users');
  },
};
