const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`

  type Query {
    freelancers: [Freelancer]!,
    clients: [Client]!,
  },

  type Mutation {
    createFreelancer(username: String!, email: String!, full_name: String!, bio: String, profile_picture: String, joined_date: String!, last_login: String!, is_active: Boolean!, rating: Float!): Freelancer!,
  },

  interface User {
    id: ID!,
    username: String!,
    email: String!,
    full_name: String!,
    bio: String,
    profile_picture: String,
    joined_date: String!,
    last_login: String!,
    is_active: Boolean!,
    rating: Float!
  },
  enum FreelancerStatus {
    # freelancer is currently available for work
    AVAILABLE,
    # freelancer is not currently available for work, but may become available in the future
    UNAVAILABLE,
    # freelancer has already been booked for future work and is not currently available
    BOOKED,
    # freelancer has not been active on the platform for a period of time and may not be available for work
    INACTIVE,
  },
  type Freelancer implements User {
    id: ID!,
    username: String!,
    email: String!,
    full_name: String!,
    bio: String,
    profile_picture: String,
    joined_date: String!,
    last_login: String!,
    is_active: Boolean!,
    rating: Float!,
    earnings: Float!,
    status: FreelancerStatus!,
  },
  type Client implements User {
    id: ID!,
    username: String!,
    email: String!,
    full_name: String!,
    bio: String,
    profile_picture: String,
    joined_date: String!,
    last_login: String!,
    is_active: Boolean!,
    rating: Float!,
    balance: Float!,
    spending: Float!,
  },
type Service {
    id: ID!,
    title: String!,
    description: String!,
    category: String!,
    price: Float!,
},
enum OrderStatus {
  # TODO: make a state diagram for the order status to make sure it makes sense

    # order has been created but not yet accepted by the freelancer
    PENDING,
    # order has been accepted by the freelancer but not yet paid for by the client
    ACCEPTED,
    # order has been paid for by the client but not yet completed by the freelancer
    PAID,
    # order has been completed by the freelancer but not yet accepted by the client
    COMPLETED,
    # order has been completed by the freelancer and accepted by the client
    CLOSED,
    # order has been cancelled by the client
    CANCELLED,
    # order has been cancelled by the freelancer
    DECLINED,
  },
type Order {
    id: ID!,
    service: Service!,
    freelancer: Freelancer!,
    client: Client!,
    status: OrderStatus!,
},
type Chat{
    id: ID!,
    messages: [Message]!,
},
type Message{
    id: ID!,
    sender: User!,
    content: String!,
    timestamp: String!,
},
`

const resolvers = {
  Query: {
    freelancers: () => {
      return [
        {
          id: 1,
          username: "anaslamaiz",
          email: "lamaizanass@gmail.com",
          full_name: "Anas Lamaiz",
          bio: "I am a full stack developer",
          profile_picture: "https://avatars.githubusercontent.com/u/56132780?v=4",
          joined_date: "2021-05-01",
          last_login: "2021-05-01",
          is_active: true,
          rating: 4.5
        },
      ]
  },
  },
  Mutation : {
    createFreelancer: (parent, args) => {
      const newFreelancer = {
        id: 0,
        username: args.username,
        email: args.email,
        full_name: args.full_name,
        bio: args.bio,
        profile_picture: args.profile_picture,
        joined_date: args.joined_date,
        last_login: args.last_login,
        is_active: args.is_active,
        rating: args.rating
      }
      return newFreelancer
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});