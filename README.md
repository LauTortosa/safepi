# Safepi - Web Application

Safepi is a web application designed to manage risks in worksplace. 

## Features

- **User Authentication:** Login and JWT token generation for secure API access.
- **Roles Authorization:** Different roles with specific permissions to access resources.
- **JWT Refresh Tokens:** Supports refreshing access tokens for continuous user sessions.
- **RESTful API:** Usable API with common actions such as GET, POST, PUT, and DELETE.
- **Security:** Secured with JWT-based authentication and authorization using roles.

## Technologies Used

- **Backend:**
  - Java
  - Spring Boot
  - Spring Security
  - Hibernate / JPA 
  - JWT (JSON Web Tokens)
  - Maven for dependency management and build
  - Jakarta Validation
  - SpringDoc
  - Dotenv

- **Frontend:**
  - React
  
- **Database:**
  - PostgreSQL
  - H2

## Installation

### Prerequisites

- Java 17 or higher
- Maven
- PostgreSQL database (modify `application.properties` to connect)

### Steps to Run the Backend Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/safepi.git
   ```
2. **Navigate to the project directory:**
  ```bash
  cd safepi
  ```
3. **Configure your application:**
    Edit `src/main/resources/application.properties` to configure database connection and JWT secret key.
    ```bash
    jwt.secret=your_jwt_secret_key
    jwt.expiration=86400000
    jwt.issuer=safepi
    spring.datasource.url=jdbc:mysql://localhost:3306/safepi_db
    spring.datasource.username=root
    spring.datasource.password=root
    ```

4. **Build the project:**
  ```bash
  mvn clean install
  ```
5. **Run the application:**
  ```bash
  mvn spring-boot:run
  ```
  The application will start running at http://localhost:8080.

6. **Access the API:**

  - POST /api/users/auth/login: Login with username and password to receive a JWT token.
  - POST /api/users/auth/refresh: Refresh your JWT token using a refresh token.
  - GET /api/users/me: Get the authenticated user's profile.
  - GET /api/users: Admin-only endpoint to view users.
  - POST /api/users: Admin-only endpoint to create a new user.
  - PUT /api/users/{id}: Admin-only endpoint to update user details.
  - DELETE /api/users/{id}: Admin-only endpoint to delete a user.
    Additional endpoints for managing risks.

## Authentication

### Login

- To log in, send a POST request to /api/users/auth/login with the following JSON body:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- A successful response will return a JWT token:
  ```json
  {
    "access_token": "your_jwt_token"
  }
  ```
### Accessing Protected Resources

- To access protected resources, send the Authorization header with your JWT token:
```http
Authorization: Bearer your_jwt_token
```

## License

- This project is licensed under the MIT License
