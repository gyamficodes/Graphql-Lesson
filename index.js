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
