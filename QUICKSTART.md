# 🚀 Quick Start Guide

Get your Attendance Tracker up and running in 5 minutes!

## Step 1: Create .env File (IMPORTANT!)

First, create the environment configuration file:

```bash
cd "/Users/gpr/Documents/Github projects/Attendance_App/backend"

cat > .env << 'EOF'
MONGODB_URI=mongodb+srv://learngpr27_db_user:ULRFO6tB4UjJjceI@cluster0.owm7yvg.mongodb.net/attendance_app?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=attendance_app_secret_key_2026_change_in_production
NODE_ENV=development
EOF

echo "✅ .env file created!"
```

This creates a `.env` file with your MongoDB connection string.

## Step 2: Install Backend Dependencies

```bash
cd "/Users/gpr/Documents/Github projects/Attendance_App/backend"
npm install
```

Wait for installation to complete (~2-3 minutes)

## Step 3: Install Frontend Dependencies

In a new Terminal window, run:

```bash
cd "/Users/gpr/Documents/Github projects/Attendance_App/frontend"
npm install
```

Wait for installation to complete (~2-3 minutes)

## Step 4: Start the Backend Server

In the first Terminal window (backend folder):

```bash
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.owm7yvg.mongodb.net
```

✅ Keep this terminal running!

## Step 5: Start the Frontend

In the second Terminal window (frontend folder):

```bash
npm start
```

Your browser will automatically open to `http://localhost:3000`

✅ Keep this terminal running too!

## Step 6: Create Your Account

1. Click **"Sign up"** on the login page
2. Fill in your details:
   - Name: Your name
   - Email: Your email
   - Password: At least 6 characters
   - Minimum Attendance %: 75 (or your institution's requirement)
3. Click **"Create Account"**

🎉 You're in!

## Step 7: Start Using the App

### Add Your First Subject
1. Click **"Subjects"** in the sidebar
2. Click **"Add Subject"**
3. Fill in subject details (name, code, teacher)
4. Pick a color
5. Click **"Add Subject"**

### Mark Attendance
1. Find your subject card
2. Click **"Mark Attendance"**
3. Select date and status (Present/Absent)
4. Click **"Mark Attendance"**

### Set Up Your Timetable
1. Click **"Timetable"** in the sidebar
2. For each day, click **"Add"**
3. Add periods with subject, time, and room
4. Click **"Save Timetable"**

### Track Class Changes
1. Click **"Class Changes"** in the sidebar
2. Click **"Add Change"**
3. Select subject, date, and type of change
4. Click **"Add Change"**

## 🎯 Understanding Your Dashboard

### Attendance Percentage
Shows your overall attendance across all subjects

### Classes to Attend/Miss
Smart suggestions based on your target percentage:
- **Below target?** Shows how many classes to attend
- **Above target?** Shows how many you can miss

### Subjects at Risk
Highlights subjects where attendance is below your target

## 💡 Pro Tips

1. **Mark attendance daily** for best results
2. **Check the dashboard** regularly to stay on track
3. **Use class changes** to track postponements
4. **Update your target** in Profile if requirements change

## ⚠️ Troubleshooting

### Backend won't start?
- **Check if .env file exists** in backend folder
- Run: `ls -la backend/.env` to verify
- If missing, create it using Step 1 above
- Check if port 5000 is available
- Verify MongoDB connection string in backend/.env

### Frontend shows connection error?
- Make sure backend is running first
- Check if backend is on port 5000

### Can't mark attendance?
- Ensure you've added subjects first
- Check if you're logged in

## 🆘 Need Help?

Check the full README.md for detailed documentation.

---

**Happy tracking! 📚✨**
