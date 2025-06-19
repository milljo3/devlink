# DevLink Tree

DevLink Tree is a personal project inspired by **Linktree**, aimed at providing a one-stop solution for managing and sharing various online links. It allows users to manage a list of links that they can easily share with others, whether for personal or professional use.

This project was developed to gain hands-on experience with industry-standard tools and technologies including React, Node.js, Express, Prisma, PostgreSQL, JWT authentication, and Docker.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [API Documentation](#api-documentation)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Challenges Faced](#challenges-faced)
* [Future Improvements](#future-improvements)
* [License](#license)

---

## Features

* **User Authentication**: Users can register, log in, and manage their profiles.
* **Link Management**: Authenticated users can add, update, and delete links in their profile.
* **JWT Authentication**: Secure login and authorization using JSON Web Tokens (JWT).
* **Responsive UI**: Built with React, designed to be responsive for both desktop and mobile views.
* **Persistent Data**: User data and links are stored in a PostgreSQL database, with all data being persisted across sessions.
* **API Endpoints**: RESTful API to manage user authentication and user links.

---

## Tech Stack

* **Frontend**:

  * **React**: For building the user interface.
  * **TypeScript**: For static type checking and better development experience.
  * **Vite**: Build tool to speed up development with fast hot reloading.

* **Backend**:

  * **Node.js**: JavaScript runtime environment.
  * **Express**: Web framework for building RESTful APIs.
  * **Prisma**: ORM for interacting with PostgreSQL, ensuring smooth database queries.
  * **Zod**: Type-safe schema validation for input data.
  * **JWT (JSON Web Tokens)**: For secure authentication and user authorization.
  * **Bcrypt.js**: For password hashing and verification.
  * **CORS**: For enabling cross-origin requests between frontend and backend.

* **Database**:

  * **PostgreSQL**: Relational database to store user data and links.
  * **Docker**: For hosting the PostgreSQL database in a containerized environment.

---

## Installation

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/milljo3/devlink.git
   cd devlink/server
   ```

2. **Set up environment variables**:

   * Create a `.env` file in the `server` directory of the project and define the following variables:

   ```env
   JWT_SECRET=your-jwt-secret-key
   POSTGRES_USER=username
   POSTGRES_PASSWORD=password
   DATABASE_URL="postgresql://username:password@localhost:5432/devlink"
   PORT=5003
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the PostgreSQL database with Docker**:

   * Make sure Docker is installed on your machine.
   * Navigate to the `server` folder and run:

   ```bash
   docker-compose up
   ```

5. **Run migrations**:

   * Use Prisma to set up the database schema:

   ```bash
   npx prisma migrate dev
   ```

6. **Start the backend server**:

   ```bash
   npm run dev
   ```

The backend should now be running on `http://localhost:5003`.

---

### Frontend Setup

1. **Navigate to the client folder**:

   ```bash
   cd client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend development server**:

   ```bash
   npm run dev
   ```

The frontend should now be running on `http://localhost:5173`.

---

## API Documentation

### Authentication Routes

* **POST /api/auth/register**
  Register a new user.

  * Body:

    ```json
    { "username": "string", "password": "string" }
    ```
* **POST /api/auth/login**
  Login and return a JWT token.

  * Body:

    ```json
    { "username": "string", "password": "string" }
    ```
  * Returns:

    ```json
    { "token": "string", "username": "string", "message": "Login success" }
    ```

### User Routes

* **GET /api/users/\:username**
  Fetch the user profile and links.

  * Params: `username` (string)
  * Response:

    ```json
    { "username": "string", "links": [{ "title": "string", "url": "string" }] }
    ```

* **PUT /api/users/\:username**
  Update the user's links. Requires authentication (JWT).

  * Params: `username` (string)
  * Body:

    ```json
    [ { "title": "string", "url": "string" }, ... ]
    ```

---

## Frontend Overview

The frontend is built using **React** and **TypeScript**. It allows users to:

* Register, login, and manage their profile.
* Add and manage links, which can be used to share multiple online profiles, portfolios, social media links, etc.

### Key Features:

* **Responsive Design**: The app adjusts to various screen sizes.
* **State Management**: Uses React's `useState` and `useEffect` for managing state and side effects.
* **Secure Authentication**: The frontend uses JWT tokens for secure authentication. On successful login, the token is stored in `localStorage` and sent with each request to protected routes.

---

## Backend Overview

The backend is built with **Node.js** and **Express**, providing a RESTful API for managing user authentication and links.

### Key Features:

* **User Authentication**: Users can register, log in, and authenticate via JWT.
* **Link Management**: Authenticated users can add, update, and delete their links.
* **Prisma ORM**: Utilized for interacting with the PostgreSQL database, enabling efficient and secure queries.

---

## Challenges Faced

* **JWT Authentication**: Implementing secure authentication using JWT was a relatively new concept for me, and I spent significant time understanding how to issue, validate, and manage JWT tokens for session management.
* **Schema Validation with Zod**: Ensuring data integrity and validating user input via Zod added an extra layer of robustness, but it required a deeper understanding of type-safe validation.
* **Dockerizing PostgreSQL**: Setting up PostgreSQL in a Docker container with `docker-compose` was a challenge, as it was my second time working with Docker in a real-world project.
* **State Management in React**: Managing user authentication states (e.g., login, logout) across different pages was tricky, especially with handling `localStorage` for persistence.

---

## Future Improvements

* **Link Categorization**: Add the ability for users to categorize their links (e.g., personal, professional).
* **Customizable Themes**: Allow users to customize the appearance of their profile.
* **File Uploads**: Allow users to upload profile pictures or logos for their DevLink page.
* **OAuth Integration**: Implement OAuth to allow users to log in using GitHub, Google, or other services.
* **Testing**: Add unit and integration tests for both frontend and backend to ensure reliability.

---

### Conclusion

This project was a great way to practice integrating various modern technologies like React, Express, Prisma, PostgreSQL, Docker, and JWT authentication. I learned a lot about building full-stack applications and look forward to further improving and extending the project in the future if time permits.
