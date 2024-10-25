import { favoriteMutations } from './Favorite/favoriteMutations';
import { favoriteQueries } from './Favorite/favoriteQueries';
import { userMutations } from './User/userMutations';
import { userQueries } from './User/userQueries';

export const resolvers = {
  Query: { ...userQueries, ...favoriteQueries },
  Mutation: { ...userMutations, ...favoriteMutations },
};
