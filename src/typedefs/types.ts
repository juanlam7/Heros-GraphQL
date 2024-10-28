export const typeDef = `#graphql
  type User {
    username: String!
    name: String!
    id: ID!
    favorites: [Favorites]!
  }
    
  type AuthPayload {
    value: String!
    refreshToken: String!
  }

  type Token {
    value: String!
  }

  type Favorites {
    heroId: Float!
    name: String!
    image: String!
    createdAt: String
    updatedAt: String
    users: [User]!
    id: ID!
  }
`;
