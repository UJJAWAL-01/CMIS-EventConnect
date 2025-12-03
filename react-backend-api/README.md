# React Backend API

## Overview
This project is a backend API built with Node.js and Express, designed to serve a React frontend application. It integrates with a MongoDB database for data storage and management, providing real-time data capabilities using Socket.IO. The API includes user authentication and authorization, ensuring secure access to resources.

## Features
- User authentication and authorization
- Real-time data management with Socket.IO
- RESTful API for managing users, students, instructors, judges, and admin operations
- MongoDB integration for data persistence
- Automated workflows using n8n for student enrollment and notifications
- Comprehensive validation for incoming requests
- Robust testing framework with unit and integration tests

## Technologies Used
- Node.js
- Express
- MongoDB (with Mongoose)
- Socket.IO
- TypeScript
- n8n
- Jest for testing

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- Docker (optional, for containerized deployment)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd react-backend-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and update the values as needed.

4. Seed the database with test data:
   ```
   npm run seed-db
   ```

### Running the Application
To start the development server, run:
```
npm run start-dev
```

### API Documentation
Refer to the API documentation for details on available endpoints and usage.

### Testing
To run the tests, use:
```
npm run test
```

## n8n Workflows
The project includes n8n workflows for automating processes:
- **Student Enrollment**: Automates the enrollment process for students.
- **Notifications**: Sends notifications based on specific triggers.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.