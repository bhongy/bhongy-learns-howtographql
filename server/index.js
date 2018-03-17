const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './generated/prisma.graphql',
      endpoint: 'http://localhost:4466/server/dev',
      secret: 'mysecret123',
      debug: true, // log all GraphQL queryies & mutations
    }),
  }),
});

server.start(() =>
  console.log('GraphQL Server is running on http://localhost:4000')
);
