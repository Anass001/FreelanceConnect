const { gql } = require('apollo-server-express');

module.exports = gql`

type Query {
  services: [Service]!,
  categories: [Category]!,
  login(email: String!, password: String!): AuthData!,
  reviewsByUserId(userId: ID!): [Review]!,
  reviewsByServiceId(serviceId: ID!): [Review]!,
  servicesByUserId(userId: ID!): [Service]!,
  servicesByCategoryId(categoryId: ID!): [Service]!,
  service(serviceId: ID!): Service!,
  servicesBySearchQuery(searchQuery: String!): [Service]!,
  user(userId: ID!): User!,
  ordersByClientId(userId: ID!): [Order]!,
  ordersByFreelancerId(userId: ID!): [Order]!,
  orderById(orderId: ID!): Order!,
},

type Mutation {
  createUser(user: UserInput): User,
  createService(service: ServiceInput): Service,
  createCategory(category: CategoryInput): Category,
  createReview(review: ReviewInput): Review,
  uploadPhoto(photo: String): String,
  singleUpload(file: Upload!): File!,
  multipleUpload(files: [Upload!]!): [File!]!,
  createOrder(order: OrderInput): Order,
},

type File {
    filename: String!,
    mimetype: String!,
    encoding: String!,
    cloudinaryUrl: String!,
},

scalar Upload,

type AuthData {
  userId: ID!,
  token: String!,
  tokenExpiration: Int!,
},

type Review {
  _id: ID!,
  reviewer: User!,
  reviewee: User!,
  rating: Float!,
  content: String!,
  date: String!,
  order: Order,
  service: Service,
},

input ReviewInput {
  reviewer: ID!,
  reviewee: ID!,
  rating: Float!,
  content: String!,
  date: String!,
  order: ID,
  service: ID,
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
  _id: ID!,
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
  rating: Float!,
  freelancer: User!,
  reviews: [Review]!,
  orders: [Order]!,
  images: [String]!,
},

input ServiceInput {
  title: String!,
  description: String!,
  category: ID!,
  price: Float!,
  images: [String]!,
},

type Category{
  _id: ID!,
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
  _id: ID!,
  service: Service!,
  freelancer: User!,
  client: User!,
  date: String!,
  price: Float!,
  deadline: String!,
  status: OrderStatus!,
  freelancer_review: Review,
  client_review: Review,
  description: String,
  chat: Chat,
},

input OrderInput {
  service: ID!,
  freelancer: ID!,
  client: ID!,
  price: Float!,
  description: String,
  deadline: String!,
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