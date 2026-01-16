# Frontend - Attendance Tracker

React-based frontend for the Attendance Tracker application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

Runs on `http://localhost:3000`

3. Build for production:
```bash
npm run build
```

## Features

- 📊 **Dashboard** - Overview of attendance statistics
- 📚 **Subjects** - Manage subjects and mark attendance
- 📅 **Timetable** - Weekly schedule management
- 🔄 **Class Changes** - Track postponements and cancellations
- 👤 **Profile** - User settings and preferences

## Project Structure

```
src/
├── components/     # Reusable components (Navbar, Sidebar)
├── context/        # React Context (Auth)
├── pages/          # Page components
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   ├── Subjects.js
│   ├── Timetable.js
│   ├── ClassChanges.js
│   └── Profile.js
├── App.js          # Main app with routing
└── index.js        # Entry point
```

## Key Dependencies

- **react-router-dom** - Routing
- **axios** - HTTP client
- **react-hot-toast** - Notifications
- **lucide-react** - Icons
- **recharts** - Charts (if needed)

## Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Proxy Configuration

API requests are proxied to `http://localhost:5000` (configured in package.json)
