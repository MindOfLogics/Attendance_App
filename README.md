# 📚 Attendance Tracker App

A comprehensive attendance tracking application with smart features to help students manage their class attendance, timetables, and stay on track with their attendance goals.

## ✨ Features

### 🎯 Smart Attendance Tracking
- **Real-time percentage calculations** - Know exactly where you stand
- **Smart suggestions** - Get personalized advice on how many classes to attend or can miss
- **Goal-based tracking** - Set your minimum attendance percentage and track progress
- **Subject-wise breakdown** - Track attendance for each subject individually

### 📅 Timetable Management
- **Weekly schedule** - Organize your classes for all 7 days
- **Period-wise planning** - Add multiple periods per day with time slots
- **Room information** - Keep track of where your classes are held
- **Color-coded subjects** - Easy visual identification

### 🔄 Class Change Tracking
- **Postponements** - Track when classes are postponed
- **Cancellations** - Record cancelled classes
- **Rescheduling** - Note when classes are moved to different times
- **Extra classes** - Keep track of additional sessions
- **Reason tracking** - Add notes about why changes happened

### 📊 Dashboard & Analytics
- **Overall statistics** - See your total attendance at a glance
- **Subject performance** - Identify which subjects need attention
- **Weekly trends** - Track your attendance patterns over time
- **Visual progress bars** - Easy-to-understand visual feedback
- **At-risk alerts** - Get notified when attendance drops below target

### 👤 User Management
- **Secure authentication** - Login and registration with JWT
- **Profile customization** - Set your attendance goals
- **Password management** - Update your credentials securely

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (connection string provided)

### Installation

1. **Clone the repository**
```bash
cd "Attendance_App"
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Environment Setup**

The backend `.env` file is already configured with your MongoDB Atlas connection. No changes needed!

### Running the Application

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on: `http://localhost:3000`

#### Option 2: Run Both Concurrently (Alternative)
```bash
# From the backend directory
npm run dev
```

## 📱 Usage Guide

### 1. Register/Login
- Create a new account with your email
- Set your minimum attendance percentage (default: 75%)

### 2. Add Subjects
- Navigate to "Subjects" page
- Click "Add Subject"
- Fill in subject details (name, code, teacher, color)
- Subject is now ready for attendance tracking!

### 3. Mark Attendance
- Go to any subject card
- Click "Mark Attendance"
- Select date and status (Present/Absent)
- Add optional notes

### 4. Set Up Timetable
- Navigate to "Timetable" page
- Click "Add" or "Edit" for each day
- Add periods with subject, time, and room info
- Save your weekly schedule

### 5. Track Class Changes
- Go to "Class Changes" page
- Click "Add Change"
- Select subject, date, and type of change
- Add reason for the change

### 6. Monitor Dashboard
- Check overall attendance percentage
- See which subjects need attention
- Get smart suggestions on classes to attend
- View upcoming class changes

## 🎨 Color Coding

The app uses color coding to make information easy to understand:
- 🟢 **Green** - Good attendance (above target)
- 🔴 **Red** - At risk (below target)
- 🟡 **Yellow** - Warnings and alerts
- 🔵 **Blue** - Information and stats

## 🧮 How Attendance Calculations Work

### Classes Needed to Attend
If your attendance is below target, the app calculates:
```
Classes Needed = (Target% × Total - 100 × Attended) / (100 - Target%)
```

### Classes You Can Miss
If you're above target, the app calculates:
```
Classes Can Miss = (100 × Attended - Target% × Total) / Target%
```

**Example:**
- Target: 75%
- Total Classes: 40
- Attended: 28
- Current Percentage: 70%

**Result:** Attend next 4 classes to reach 75%

## 🛠️ Technology Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** - API calls
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📁 Project Structure

```
Attendance_App/
├── backend/
│   ├── config/         # Database configuration
│   ├── models/         # MongoDB schemas
│   ├── controllers/    # Business logic
│   ├── routes/         # API routes
│   ├── middleware/     # Auth middleware
│   └── server.js       # Entry point
│
├── frontend/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React context
│   │   ├── pages/      # Page components
│   │   ├── App.js      # Main app component
│   │   └── index.js    # Entry point
│   └── package.json
│
└── README.md
```

## 🔐 Security Features

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Protected API routes
- Input validation and sanitization

## 🌟 Key Features Explained

### Smart Suggestions
The app provides actionable advice:
- "Attend the next 3 classes to reach 75%"
- "You can miss up to 2 classes and maintain 75%"

### Attendance Percentage
Always up-to-date calculation:
```
Percentage = (Classes Attended / Total Classes) × 100
```

### Subject Status
- **Safe** 🟢 - Above target percentage
- **At Risk** 🔴 - Below target percentage

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Subjects
- `GET /api/subjects` - Get all subjects
- `POST /api/subjects` - Create subject
- `PUT /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject
- `POST /api/subjects/:id/attendance` - Mark attendance
- `GET /api/subjects/:id/calculations` - Get attendance calculations

### Timetable
- `GET /api/timetable` - Get full timetable
- `GET /api/timetable/today` - Get today's schedule
- `POST /api/timetable` - Create/update timetable
- `DELETE /api/timetable/:day` - Delete day schedule

### Class Changes
- `GET /api/class-changes` - Get all changes
- `GET /api/class-changes/upcoming` - Get upcoming changes
- `POST /api/class-changes` - Create change
- `PUT /api/class-changes/:id` - Update change
- `DELETE /api/class-changes/:id` - Delete change

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/history` - Get attendance history

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📄 License

This project is for educational purposes.

## 🎓 Perfect For

- College students
- University students  
- Anyone needing to track attendance
- Students with minimum attendance requirements

## 💡 Tips for Best Results

1. **Mark attendance daily** for accurate tracking
2. **Set realistic target percentage** based on your institution's requirements
3. **Update timetable** at the start of each semester
4. **Track class changes** to stay organized
5. **Check dashboard regularly** to stay on top of your attendance

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Ensure port 5000 is not in use

### Frontend won't connect
- Make sure backend is running
- Check if proxy is set correctly in frontend package.json

### Can't login
- Clear browser cache
- Check if backend is running
- Verify MongoDB is accessible

## 📞 Support

For issues or questions, please check:
1. This README file
2. Console errors in browser (F12)
3. Terminal errors for backend

---

**Made with ❤️ for students who want to stay on track with their attendance!**

🎯 Start tracking your attendance smartly today!
