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

import { verify } from 'jsonwebtoken';
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
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log(err);
  });

const corsOptions = {
  origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
  credentials: true,
};

await server.start();

app.use(
  '/graphql',
  cookieParser(),
  cors(corsOptions),
  graphqlUploadExpress({
    maxFileSize: 1000000, // 1 MB
    maxFiles: 20,
  }),
  bodyParser.json(),
  expressMiddleware(server, {
    context: ({ req }) => {
      const token = req.cookies.token; // Get the token value from the 'token' cookie

      if (!token) {
        req.isAuth = false;
        console.log('No token');
        return {
          isAuth: false,
        }
      }

      let decodedToken;
      try {
        decodedToken = verify(token, process.env.JWT_KEY);
      } catch (err) {
        req.isAuth = false;
        console.log('Invalid token');
        return {
          isAuth: false,
        }
      }

      if (!decodedToken) {
        req.isAuth = false;
        console.log('Invalid token');
        return {
          isAuth: false,
        }
      }

      console.log('Valid token');

      return {
        isAuth: true,
        userId: decodedToken.userId,
      }
    } // Retrieve token from req.cookies
  }),
);

const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});