export const queriesDef = `#graphql
  type Query {
    me: User
    initCall: String
    
    favoriteCount: Int!
    allFavorites: [Favorites]!
  }
`;
