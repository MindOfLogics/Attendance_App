# 🔧 Environment Setup - IMPORTANT!

## ⚠️ ACTION REQUIRED: Create .env File

The `.env` file contains your MongoDB connection string and is required for the app to work.

### Step 1: Create the .env file

Navigate to the backend folder and create a file named `.env`:

```bash
cd "/Users/gpr/Documents/Github projects/Attendance_App/backend"
touch .env
```

### Step 2: Add your MongoDB connection

Open the `.env` file in any text editor and paste this:

```env
MONGODB_URI=mongodb+srv://learngpr27_db_user:ULRFO6tB4UjJjceI@cluster0.owm7yvg.mongodb.net/attendance_app?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=attendance_app_secret_key_2026_change_in_production
NODE_ENV=development
```

### Step 3: Save the file

Save and close the `.env` file.

---

## 🚀 Quick Method (Copy & Paste in Terminal)

Run these commands in Terminal:

```bash
cd "/Users/gpr/Documents/Github projects/Attendance_App/backend"

cat > .env << 'EOF'
MONGODB_URI=mongodb+srv://learngpr27_db_user:ULRFO6tB4UjJjceI@cluster0.owm7yvg.mongodb.net/attendance_app?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=attendance_app_secret_key_2026_change_in_production
NODE_ENV=development
EOF

echo "✅ .env file created successfully!"
```

---

## 📋 Alternative: Copy from .env.example

I've created a `.env.example` file in the backend folder. You can copy it:

```bash
cd "/Users/gpr/Documents/Github projects/Attendance_App/backend"
cp .env.example .env
```

---

## ✅ Verify .env File Exists

Check if the file was created:

```bash
cd "/Users/gpr/Documents/Github projects/Attendance_App/backend"
ls -la | grep .env
```

You should see `.env` in the list.

---

## 🔍 How the Connection is Used

The backend code (`server.js`) loads environment variables:

```javascript
const dotenv = require('dotenv');
dotenv.config();  // This loads .env file
```

Then `config/db.js` uses it to connect to MongoDB:

```javascript
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

---

## 🔐 Your MongoDB Connection String

```
mongodb+srv://learngpr27_db_user:ULRFO6tB4UjJjceI@cluster0.owm7yvg.mongodb.net/attendance_app?retryWrites=true&w=majority&appName=Cluster0
```

**Breakdown:**
- **Protocol:** `mongodb+srv://`
- **Username:** `learngpr27_db_user`
- **Password:** `ULRFO6tB4UjJjceI`
- **Cluster:** `cluster0.owm7yvg.mongodb.net`
- **Database:** `attendance_app`
- **Options:** `retryWrites=true&w=majority&appName=Cluster0`

---

## 🐛 Troubleshooting

### Error: "MONGODB_URI is not defined"

**Solution:** The `.env` file doesn't exist or isn't in the right location.

```bash
# Check current directory
pwd
# Should be: /Users/gpr/Documents/Github projects/Attendance_App/backend

# Create .env file
cat > .env << 'EOF'
MONGODB_URI=mongodb+srv://learngpr27_db_user:ULRFO6tB4UjJjceI@cluster0.owm7yvg.mongodb.net/attendance_app?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=attendance_app_secret_key_2026_change_in_production
NODE_ENV=development
EOF
```

### Error: "Failed to connect to MongoDB"

**Possible causes:**
1. Check internet connection
2. Verify MongoDB Atlas cluster is active
3. Check if connection string is correct in `.env`

### Check if .env is loaded correctly

Add this temporarily to `server.js` before `connectDB()`:

```javascript
console.log('MongoDB URI:', process.env.MONGODB_URI);
```

Run the server and check if the URI is printed.

---

## ✅ Complete Setup Checklist

Before running the app, ensure:

- [ ] `.env` file exists in `backend/` folder
- [ ] File contains `MONGODB_URI` with your connection string
- [ ] File contains `PORT=5000`
- [ ] File contains `JWT_SECRET`
- [ ] File is saved

---

## 🎯 Next Steps

After creating the `.env` file:

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start the backend server:
   ```bash
   npm run dev
   ```

3. You should see:
   ```
   Server running in development mode on port 5000
   MongoDB Connected: cluster0.owm7yvg.mongodb.net
   ```

If you see "MongoDB Connected", you're all set! ✅

---

## 📞 Still Having Issues?

If the `.env` file creation doesn't work, you can also:

1. **Use a code editor:**
   - Open VS Code or any text editor
   - Create new file: `backend/.env`
   - Paste the environment variables
   - Save

2. **Use Finder (macOS):**
   - Go to backend folder
   - Press `Cmd + Shift + .` to show hidden files
   - Create new file named `.env`
   - Edit with TextEdit
   - Paste the variables
   - Save

---

**Once `.env` is created, your MongoDB connection will work! 🚀**
