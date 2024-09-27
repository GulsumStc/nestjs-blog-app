# NestJS Blog Application

This project is a blog application developed using NestJS, TypeORM, PostgreSQL, and JWT for authentication. It serves as a practical application to learn NestJS while integrating various concepts and features.

## Project Structure

- **src/**
  - **app.controller.ts**: Main application controller.
  - **app.service.ts**: Main application service.
  - **auth/**: Contains authentication-related modules, guards, and configurations.
  - **common/**: Common utilities, interceptors, and filters.
  - **config/**: Application and database configuration files.
  - **meta-options/**: Module for managing meta options.
  - **posts/**: Contains post-related modules, entities, and services.
  - **tags/**: Contains tag-related modules and entities.
  - **users/**: Contains user-related modules, entities, and services.

## Technologies Used

- **NestJS**: Framework for building efficient and scalable server-side applications.
- **TypeORM**: ORM for TypeScript and JavaScript.
- **PostgreSQL**: Relational database for data storage.
- **JWT**: For user authentication and authorization.
- **Swagger**: For API documentation.
- **Compodoc**: A documentation tool for generating API documentation in a static site.


##Environment Variables
```bash
DATABASE_PORT=
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_SYNCHRONIZE=

PROFILE_API_KEY=

JWT_SECRET=
JWT_TOKEN_AUDIENCE=
JWT_TOKEN_ISSUER=
JWT_ACCESS_TOKEN_TTL=
JWT_REFRESH_TOKEN_TTL=
API_VERSION=
```

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nestjs-intro
   ```
2. Install dependencies:
   ```bash
   npm install
     cd nestjs-intro
   ```
3. Set up your environment variables in a .env.development file based on the Environment Variables section above.
4. Run the application:
    ```bash
   npm run start
   ```



   


   


