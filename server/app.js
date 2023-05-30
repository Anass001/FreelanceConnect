import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import cors from 'cors';
import typeDefs from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';
import { connect } from 'mongoose';

import isAuth from './middleware/is-auth.js';
// import { ApolloServer, gql } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import cookieParser from 'cookie-parser';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

connect(`mongodb+srv://
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

await server.start();

app.use(
  '/graphql',
  cors(),
  graphqlUploadExpress({
    maxFileSize: 1000000, // 1 MB
    maxFiles: 20,
  }),
  cookieParser(),
  isAuth,
  bodyParser.json(),
  expressMiddleware(server)
);

const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});

// async function startServer() {
//   app.use(
//     graphqlUploadExpress({
//       // Limits here should be stricter than config for surrounding infrastructure
//       // such as NGINX so errors can be handled elegantly by `graphql-upload`.
//       maxFileSize: 1000000, // 1 MB
//       maxFiles: 20,
//     })
//   );
//   app.use(cookieParser());
//   app.use(isAuth);
//   await server.start();
//   server.applyMiddleware({ app, cors: corsOptions });
// }

// startServer();

// app.listen(4000, '0.0.0.0');