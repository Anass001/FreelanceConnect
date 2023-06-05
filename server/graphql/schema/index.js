import { gql } from 'apollo-server-express';

const Schema = gql`

type Query {
  login(email: String!, password: String!): AuthData!,
  user(userId: ID!): User!,
  getUserByToken(token: String!): User!,

  reviewsByUserId(userId: ID!): [Review]!,
  reviewsByServiceId(serviceId: ID!): [Review]!,
  reviewsByOrderId(orderId: ID!): [Review]!,

  services: [Service]!,
  servicesByUserId(userId: ID!): [Service]!,
  servicesByCategory(category: String!): [Service]!,
  servicesByCategoryUrlName(categoryUrlName: String!): [Service]!,
  service(serviceId: ID!): Service!,
  servicesBySearchQuery(searchQuery: String!): [Service]!,

  categories: [Category]!,

  ordersByClientId(userId: ID!): [Order]!,
  ordersByFreelancerId(userId: ID!): [Order]!,
  orderById(orderId: ID!): Order!,

  conversationByOrderId(orderId: ID!): Conversation!,
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
  sendMessage(message: MessageInput): Message,
  updateOrderStatus(orderId: ID!, status: String!): Order,
},

type Subscription {
  messageSent(conversationId: ID!): Message,
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
  reviewee: ID!,
  rating: Float!,
  content: String!,
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
  _id: ID!,
  users: [User]!,
  messages: [Message]!,
},

type Message {
  _id: ID!,
  sender: User!,
  body: String!,
  date: String!,
  conversation: ID!,
},

input MessageInput {
  sender: ID!,
  body: String!,
  conversation: ID!,
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
  url_name: String!,
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
  IN_PROGRESS,
  # order has been completed by the freelancer and accepted by the client
  COMPLETED,
  # order has been completed by the freelancer and paid by the client
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
  conversation: Conversation,
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

`
export default Schema;