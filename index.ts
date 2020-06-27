import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import types from "./typeDefs/types";
import query from "./typeDefs/query";
import mutation from "./typeDefs/mutation";
import resolvers from "./resolvers";

process.env.APP_SECRET = "DEV_ENV";

const server = new ApolloServer({
  typeDefs: [types, query, mutation],
  resolvers,
  context: () => ({
    prisma: new PrismaClient(),
  }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
