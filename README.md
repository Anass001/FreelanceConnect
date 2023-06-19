# FreelanceConnect
FreelanceConnect is a website developed using Node.js, MongoDB, React, and GraphQL. It serves as a platform for connecting freelancers with clients. Freelancers can showcase their services and clients can easily browse and order these services.

* Team Members:
  - Anas Lamaiz @Anass001
  - Ismail Oukha @itsmeismaill
* Supervising Professor:
  - Mr. Lotfi Elaachak 
* Course Module:
  - Développement web et frameworks

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
