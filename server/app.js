const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const Service = require('./models/service');

const typeDefs = gql`

  type Query {
    freelancers: [Freelancer]!,
    clients: [Client]!,
    services: [Service]!,
  },

  type Mutation {
    createFreelancer(freelancer: FreelancerInput): Freelancer,
    createService(service: ServiceInput): Service,
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
  input FreelancerInput {
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
    _id: ID!,
    title: String!,
    description: String!,
    category: String!,
    price: Float!,
},
input ServiceInput {
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
    services: () => {
      return Service.find().then(services => {
        return services.map(service => {
          return { ...service._doc, _id: service.id };
        });
      }).catch(err => {
        throw err;
      });
    },
  },
  Mutation: {
    createFreelancer: (parent, { freelancer }) => {
      const newFreelancer = {
        id: 0,
        username: freelancer.username,
        email: freelancer.email,
        full_name: freelancer.full_name,
        bio: freelancer.bio,
        profile_picture: freelancer.profile_picture,
        joined_date: freelancer.joined_date,
        last_login: freelancer.last_login,
        is_active: freelancer.is_active,
        earnings: freelancer.earnings,
        rating: freelancer.rating,
        status: freelancer.status,
      }
      return newFreelancer
    },
    createService: (parent, { service }) => {
      const newService = new Service({
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
      });
      return newService.save().then(result => {
        console.log(result);
        return result
      }).catch(err => {
        console.log(err);
        throw err;
      });
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

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