import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';
import './db';
import { JwtPayloadInterface } from './interfaces/interfaces';
import User from './models/user';
import { resolvers } from './resolvers';
import { typeDefs } from './typedefs';

interface MyContext {
  token?: string;
  currentUser?: any;
}

const JWT_SECRET = process.env.JWT_SECRET!;
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/api',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization || null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const token = auth.substring(7);
          try {
            const { id } = jwt.verify(token, JWT_SECRET) as JwtPayloadInterface;
            const currentUser = await User.findById(id).populate('favorites');
            return { currentUser };
          } catch (err) {
            console.error('JWT verification error:', err);
          }
        }
        return {};
      },
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
  );

  console.log(`🚀 Server ready at http://localhost:${PORT}/api`);
};

startServer();
