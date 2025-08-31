export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]! # Relationship: A Game can have many Reviews
  }
  
  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!   # Relationship: A Review is written by one Author
    game: Game!       # Relationship: A Review is about one Game
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]! # Relationship: An Author can have many Reviews
  }

  type Query {
    # Query to get all arrays of items
    games: [Game]
    reviews: [Review]
    authors: [Author]

    # Query to get a specific item by ID (optional but very useful)
    game(id: ID!): Game
    review(id: ID!): Review
    author(id: ID!): Author

  }
`;
