</br>
<div align="center">
  <img src="https://github.com/Anass001/FreelanceConnect/blob/master/freelance-connect.gif" width="350px">
</div>
</br>
FreelanceConnect is a website developed using Node.js, MongoDB, React, and GraphQL. It serves as a platform for connecting freelancers with clients. Freelancers can showcase their services and clients can easily browse and order these services.

## Features
This project includes the following features:

- **User Authentication**: Users can register an account, log in, and log out. Authentication is handled using JSON Web Tokens (JWT) for secure access to protected routes.
- **CRUD Operations**: Users can perform CRUD (Create, Read, Update, Delete) operations on various entities in the application, such as creating, editing, and deleting services or orders.
- **Real-time Messaging**: The application utilizes GraphQL subscriptions to provide real-time messaging functionality. Users can send and receive messages in real-time without needing to refresh the page.
- **Image Upload**: Users can upload images to the application using the Cloudinary platform. The uploaded media is securely stored and accessible in the application.
- **Search Functionality**: Users can search for specific content within the application using keywords. The search functionality provides relevant and filtered results based on user queries.
- **Responsive Design**: The application is designed to be responsive and accessible across different devices and screen sizes, providing a seamless experience for users on desktops, tablets, and mobile devices.
- **Error Handling**: The application includes robust error handling mechanisms to gracefully handle and display error messages when encountering failures or invalid input.
- **Security**: Various security measures are implemented, including secure password hashing, input validation, and authorization checks to protect user data and prevent unauthorized access.

## Technologies Used

This project utilizes the following technologies:

- **MERN Stack:**
  - MongoDB: A NoSQL database for storing data.
  - Express.js: A web application framework for building the server-side application.
  - React: A JavaScript library for building user interfaces.
  - Node.js: A runtime environment for executing server-side JavaScript code.

- **GraphQL:** A query language and runtime for APIs.

- **NGINX:** A web server and reverse proxy server used for server deployment.

- **JWT (JSON Web Tokens):** A standard for securely transmitting information between parties as a JSON object.

- **Cloudinary:** A cloud-based image and video management platform.

- **Other libraries and tools:** React Router, Apollo Client, GraphQL-Upload, Nodemon, etc.

## API Documentation

The API of this project follows the GraphQL specification. Below is an overview of the available queries, mutations, and subscriptions:

### Queries

#### `login`
- Description: Authenticates a user based on their email and password.
- Input:
  - `email: String!` - The user's email address.
  - `password: String!` - The user's password.
- Output:
  - `AuthData` - An object containing the user's authentication token and user information.

#### `user`
- Description: Retrieves information about a specific user.
- Input:
  - `userId: ID!` - The unique identifier of the user.
- Output:
  - `User` - The user object containing information such as username, email, and profile details.

#### `service`
- Description: Retrieves information about a specific service.
- Input:
  - `serviceId: ID!` - The unique identifier of the service.
- Output:
  - `Service` - The service object containing information such as title, description, and pricing.

### Mutations

#### `createUser`

- Description: Creates a new user.
- Input:
  - `user: UserInput` - The user object with details such as username, email, and password.
- Output:
  - `User` - The newly created user object.

#### `createService`

- Description: Creates a new service.
- Input:
  - `service: ServiceInput` - The service object with details such as title, description, and pricing.
- Output:
  - `Service` - The newly created service object.

### Subscriptions

#### `messageSent`
- Description: Subscribes to new messages in a conversation.
- Input:
  - `conversationId: ID!` - The unique identifier of the conversation.
- Output:
  - `Message` - The newly sent message object.

Refer to the GraphQL schema and corresponding resolvers for detailed information about the input and output types of each field.

## Project Setup and Installation

To run this project locally or deploy it to a server using NGINX, follow the steps below:

### Prerequisites

Before getting started, ensure that you have the following prerequisites installed on your system:

- Node.js (v12 or higher)
- MongoDB
- NGINX (for server deployment)

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/Anass001/FreelanceConnect.git
   cd FreelanceConnect
   ```
   
2. Install project dependencies:

   ```bash
   npm install
   ```
   
3. Configure environment variables:
Update the nodemon.json file located in the root directory of the project with your environment variables:

   ```json
   {
      "env": {
      "MONGO_ATLAS_USER": "<your-mongo-atlas-user>",
      "MONGO_ATLAS_PW": "<your-mongo-atlas-password>",
      "MONGO_ATLAS_DB": "<your-mongo-atlas-database>",
      "CLOUDINARY_API_KEY": "<your-cloudinary-api-key>",
      "CLOUDINARY_API_SECRET": "<your-cloudinary-api-secret>",
      "CLOUDINARY_NAME": "<your-cloudinary-name>",
      "JWT_KEY": "<your-jwt-key>"
      }
   }
   ```
Replace the placeholders with the actual values specific to your project.

4. Start the Express.js server:

   ```bash
   npm run server
   ```
  
5. Start the React client:

   ```bash
   npm run client
   ```
  
6. Access the application:

- Server: http://localhost:4000
- Client: http://localhost:3000

### Server Deployment with NGINX

1. Prepare your server:

- Set up a virtual machine or a physical server with your preferred Linux distribution.
- Install Node.js, MongoDB, and NGINX on the server.

2. Clone the repository:

   ```bash
   git clone https://github.com/Anass001/FreelanceConnect.git
   cd FreelanceConnect
   ```
   
3. Install project dependencies:

   ```bash
   npm install
   ```
   
4. Configure environment variables:
Update the nodemon.json file located in the root directory of the project with your environment variables:

   ```json
   {
      "env": {
      "MONGO_ATLAS_USER": "<your-mongo-atlas-user>",
      "MONGO_ATLAS_PW": "<your-mongo-atlas-password>",
      "MONGO_ATLAS_DB": "<your-mongo-atlas-database>",
      "CLOUDINARY_API_KEY": "<your-cloudinary-api-key>",
      "CLOUDINARY_API_SECRET": "<your-cloudinary-api-secret>",
      "CLOUDINARY_NAME": "<your-cloudinary-name>",
      "JWT_KEY": "<your-jwt-key>"
      }
   }
   ```
Replace the placeholders with the actual values specific to your project.

5. Build the client:

   ```bash
   npm run build
   ```
  
  This command creates an optimized production build of the React client.

6. Configure NGINX:

- Open the NGINX configuration file:

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```
  
- Replace the contents of the file with the following:

   ```nginx
   user www-data;
   worker_processes auto;
   pid /run/nginx.pid;
   include /etc/nginx/modules-enabled/*.conf;
 
   events {
     worker_connections 768;
     # multi_accept on;
   }

   http {
     server {
         listen 80;
         server_name example.com;
 
         location / {
             root /path/to/your/project/build;
             index index.html;
             try_files $uri /index.html;
         }
     }
   }
   ```
  
- Replace example.com with your domain or server IP address.
- Replace /path/to/your/project/build with the absolute path to the build directory of your project.

7. Start NGINX:

   ```bash
   sudo service nginx start
   ```
  
  NGINX will now serve your React client as a static site.

8. Start the Express.js server:

   ```bash
   npm run start
   ```
  
9. Access the application:

Visit your domain or server IP address in a web browser to access the deployed application.

## Authors
This exceptional project was expertly developed as an end-of-module assignment. Our talented team, consisting of:
  - Anas Lamaiz [@Anass001](https://github.com/Anass001)
  - Ismail Oukha [@itsmeismaill](https://github.com/itsmeismaill)

collaborated under the invaluable guidance of Professor:
  - Mr. Lotfi Elaachak

Together, we dedicated ourselves to crafting a remarkable endeavor that showcases our skills and knowledge in the field of web development and frameworks.
