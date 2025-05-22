# TaskManager
TaskManager is a full-stack task management application built with React (Vite + Tailwind CSS) for the frontend and Node.js (Express) for the backend. It allows users to create, update, and track tasks with file attachments, priority levels, and due dates.

---

## Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **JavaScript/JSX** - Programming language and syntax extension

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for Node.js
- **Mongoose** - MongoDB object modeling library
- **Multer** - Middleware for handling file uploads
- **CORS** - Cross-Origin Resource Sharing middleware

### Database
- **MongoDB** - NoSQL document database
- **MongoDB Atlas** (optional) - Cloud database service

### DevOps & Deployment
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration tool

---

### Backend (server/)
- **Express.js** server with RESTful API endpoints
- **MongoDB** integration using Mongoose ODM
- File upload handling with Multer
- CORS configuration for cross-origin requests
- Task CRUD operations and data validation

### Frontend (client/)
- **React** application with component-based architecture
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive and modern styling
- Task management interface with forms and lists
- File attachment support and priority management

### Database
- **MongoDB** for storing task data, user information, and file metadata
- Document-based storage for flexible task schemas
- Mongoose for data modeling and validation

---

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes bundled with Docker Desktop)

---

## Setup and Run with Docker

1. **Clone the repository:**
   ```bash
   git clone https://your-repo-url.git
   cd PanScience_Assignement
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

4. **Stop the services:**
   ```bash
   docker-compose down
   ```

---

## Development Setup (Without Docker)

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   PORT=3000
   JWT_SECRET=your jwt secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Set task priorities (High, Medium, Low)
- ✅ Add due dates to tasks
- ✅ File attachment support
- ✅ Responsive design with Tailwind CSS
- ✅ RESTful API with Express.js
- ✅ MongoDB database integration
- ✅ Docker containerization
- ✅ Cross-origin resource sharing (CORS) enabled

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

If you encounter any issues or have questions, please create an issue in the GitHub repository.
