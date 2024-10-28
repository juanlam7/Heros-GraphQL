export const mutationsDef = `#graphql
  type Mutation {
    createUser(username: String!, name: String!, password: String!): User
    login(username: String!, password: String!): AuthPayload!
    refreshToken(refreshToken: String!): AuthPayload!
    
    addFavorite(heroId: Float!, name: String!, image: String!): Favorites
    deleteFavorite(heroId: Float!): String
  }
`;
