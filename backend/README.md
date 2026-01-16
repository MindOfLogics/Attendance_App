# Backend - Attendance Tracker API

RESTful API for the Attendance Tracker application built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. The `.env` file is already configured with MongoDB Atlas connection.

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:5000`

## API Documentation

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "minAttendancePercentage": 75
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Subject Routes (Protected)

#### Get All Subjects
```http
GET /api/subjects
Authorization: Bearer <token>
```

#### Create Subject
```http
POST /api/subjects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mathematics",
  "code": "MATH101",
  "teacher": "Dr. Smith",
  "color": "#4F46E5",
  "credits": 3
}
```

#### Mark Attendance
```http
POST /api/subjects/:id/attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "present",
  "date": "2026-01-16",
  "notes": "Optional notes"
}
```

#### Get Attendance Calculations
```http
GET /api/subjects/:id/calculations?target=75
Authorization: Bearer <token>
```

## Models

### User
- name, email, password
- minAttendancePercentage
- role (student/teacher/admin)

### Subject
- name, code, teacher, color, credits
- totalClasses, attendedClasses
- Calculates: attendancePercentage, classesToAttend, classesCanMiss

### Timetable
- day (Monday-Sunday)
- periods (array of period objects)

### Attendance
- date, status (present/absent/cancelled/postponed)
- subjectId, userId

### ClassChange
- changeType (postponed/cancelled/rescheduled/extra)
- originalDate, newDate
- reason

## Environment Variables

```env
MONGODB_URI=<your-mongodb-connection-string>
PORT=5000
JWT_SECRET=<your-secret-key>
NODE_ENV=development
```
