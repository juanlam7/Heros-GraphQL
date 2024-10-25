export const typeDef = `#graphql
  type User {
    username: String!
    name: String!
    id: ID!
    favorites: [Favorites]!
  }

  type Token {
    value: String!
  }

  type Favorites {
    heroId: Float!
    name: String!
    createdAt: String
    updatedAt: String
    users: [User]!
    id: ID!
  }
`;
