export const mutationsDef = `#graphql
  type Mutation {
    createUser(username: String!, name: String!, password: String!): User
    login(username: String!, password: String!): Token
    refreshToken(refreshToken: String!): Token
    
    addFavorite(heroId: Float!, name: String!): Favorites
    deleteFavorite(heroId: Float!): String
  }
`;
