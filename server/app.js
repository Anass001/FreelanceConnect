const express = require('express');
const app = express();

const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./graphql/schema/index')
const resolvers = require('./graphql/resolvers/index');
const server = new ApolloServer({ typeDefs, resolvers });

const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

mongoose.connect(`mongodb+srv://
${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}
@cluster0.y16icjh.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.log(err)
  });

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});