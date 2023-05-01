const {gql} = require('apollo-server-express');

module.exports = gql`

type Query {
  services: [Service]!,
  categories: [Category]!,
},

type Mutation {
  createUser(user: UserInput): User,
  createService(service: ServiceInput): Service,
  createCategory(category: CategoryInput): Category,
},

type Review {
  id: ID!,
  reviewer: User!,
  reviewee: User!,
  rating: Float!,
  content: String!,
  date: String!,
},

type Notification {
  id: ID!,
  user: User!,
  content: String!,
  date: String!,
},

type Conversation {
  id: ID!,
  users: [User]!,
  messages: [Message]!,
},

type Message {
  id: ID!,
  conversation: Conversation!,
  sender: User!,
  content: String!,
  date: String!,
},

type User {
  id: ID!,
  username: String!,
  email: String!,
  password: String!,
  full_name: String!,
  bio: String,
  profile_picture: String,
  joined_date: String!,
  last_login: String!,
  is_active: Boolean!,
  freelance_rating: Float!,
  client_rating: Float!,
  earnings: Float!,
  balance: Float!,
  spending: Float!,
  services: [Service]!,
  reviews: [Review]!,
  notifications: [Notification]!,
  orders: [Order]!,
  conversations: [Conversation]!,
},

input UserInput {
  username: String!,
  email: String!,
  password: String!,
  full_name: String!,
  bio: String,
  profile_picture: String,
  # joined_date: String!,
  # last_login: String!,
  # is_active: Boolean!,
  # rating: Float!
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
  category: ID!,
  price: Float!,
},

type Category{
  id: ID!,
  name: String!,
  description: String!,
  services: [Service]!,
}

input CategoryInput{
  name: String!,
  description: String!,
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
  freelancer: User!,
  client: User!,
  date: String!,
  price: Float!,
  deadline: String!,
  status: OrderStatus!,
  freelancer_review: Review,
  client_review: Review,
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