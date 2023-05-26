const express = require('express');
const app = express();
const isAuth = require('./middleware/is-auth');
const { ApolloServer, gql } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');

const typeDefs = require('./graphql/schema/index')

const resolvers = require('./graphql/resolvers/index');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { GraphQLWsLink } = require("@apollo/client/link/subscriptions");
const { createClient } = require("graphql-ws");

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/subscriptions',
}));

const server = new ApolloServer({ typeDefs, resolvers }, {
  context: ({ req }) => {
    console.log(req)
  }
}
);

mongoose.connect(`mongodb+srv://
${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}
@cluster0.y16icjh.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.log(err)
  });

const corsOptions = {
  origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
  credentials: true
}

async function startServer() {
  app.use(
    graphqlUploadExpress({
      // Limits here should be stricter than config for surrounding infrastructure
      // such as NGINX so errors can be handled elegantly by `graphql-upload`.
      maxFileSize: 1000000, // 1 MB
      maxFiles: 20,
    })
  );
  app.use(cookieParser());
  app.use(isAuth);
  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });
}

startServer();

app.listen(4000, '0.0.0.0');