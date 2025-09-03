import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//types
import { typeDefs } from "./schema.js";
//db
import { db } from "./_db.js";

const resolvers = {
  Query: {
    games: () => db.games,
    reviews: () => db.reviews,
    authors: () => db.authors,

    //     # Query to get a specific item by ID (optional but very useful)
    game: (_, args) => db.games.find((game) => game.id === args.id),
    review: (_, args) => db.reviews.find((review) => review.id === args.id),
    author: (_, args) => db.authors.find((author) => author.id === args.id),
  },

  //Game has many Reviews
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },

  //Review is written by one Author and is about one Game
  //Author has many Reviews
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },

  // Review is written by one Author and is about one Game
  // Author has many reviews
  // Game has many reviews
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },

  Mutation: {
    deleteGame: (_, args) => {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame: (_, args) => {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 1000).toString(),
      };
      db.games.push(game);
      return game;
    },

  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at ${url}`);
