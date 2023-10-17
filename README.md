# Simple-Crash-Bloggy

## Description

Blogster is a blog application that allows users to create, update, delete, and view blog posts. Additionally, users can register for an account and log in to manage their posts. The application provides the following main features:

- **User Registration**: Users can sign up for an account by providing a unique username, a valid email address, and a secure password.

- **User Authentication**: Registered users can log in to access the application's features, and they will receive a JSON Web Token (JWT) for authentication.

- **Blog Post Management**: Users can create new blog posts by providing a title and content. They can also update and delete posts that they have created. The application ensures that users can only modify or delete posts they own.

- **Viewing Blog Posts**: Users can view a list of all the blog posts available.

This application is built using Node.js, Express, and MongoDB for data storage. It provides a simple and user-friendly interface for creating, managing, and viewing blog posts.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Usage](#usage)
   - [Running the App](#running-the-app)
   - [Authentication](#authentication)
   - [API Endpoints](#api-endpoints)
3. [Database](#database)
4. [Configuration](#configuration)
5. [Contributing](#contributing)

## Getting Started

### Prerequisites

To run simple-crash-bloggy, make sure you have the following prerequisites installed:

- Node.js and npm
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ammar1616/simple-crash-bloggy.git
   ```
2.Install the dependencies:
npm install

## Usage

### Running the App
To run the application, execute the following command:
node app.js


The application will be accessible at http://localhost:4000 by default. You can configure the port in the environment variables if needed.

### Authentication
Blogster uses JWT (JSON Web Tokens) for authentication. To access protected routes, include your JWT token in the Authorization header of your requests.

### API Endpoints
simple-crash-bloggy provides the following API endpoints:

POST /register: Register a new user.

POST /login: Log in with your registered email and password to obtain an authentication token.

POST /addpost: Create a new post.

GET /getposts: Get a list of posts.

PATCH /updatepost/:postId: Update a specific post created by the current user.

DELETE /deletepost/:postId: Delete a specific post created by the current user.


### Database
Blogster uses MongoDB as its database. You can configure the database connection in your environment variables or a configuration file.

### Configuration
You can configure your MongoDB connection and other environment-specific settings by modifying the appropriate environment variables in a .env file.

### Contributing
If you'd like to contribute to simple-crash-bloggy, please follow our contribution guidelines.
