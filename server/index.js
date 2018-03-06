const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query');

const resolvers = {
  Query,
}

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './server/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/server/dev',
      secret: 'mysecret123',
      debug: true, // log all GraphQL queryies & mutations
    }),
  }),
})

server.start(() => console.log('GraphQL Server is running on http://localhost:4000'))
