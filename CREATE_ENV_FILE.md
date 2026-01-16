# 🔑 Create .env File - Your MongoDB Connection

## ⚠️ IMPORTANT: This Step is Required!

The `.env` file contains your MongoDB connection string. Without it, the app won't connect to the database.

---

## 🚀 Quick Method (Copy & Paste)

Open Terminal and run these commands:

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

That's it! The `.env` file is now created with your MongoDB connection string.

---

## ✅ Verify It Was Created

Check if the file exists:

```bash
ls -la backend/.env
```

You should see something like:
```
-rw-r--r--  1 gpr  staff  xxx Jan 16 xx:xx backend/.env
```

---

## 📋 Alternative Method: Manual Creation

If the command above doesn't work, create it manually:

### Option 1: Using TextEdit (Mac)

1. Open **TextEdit**
2. Go to **Format** > **Make Plain Text** (important!)
3. Copy and paste this:

```
MONGODB_URI=mongodb+srv://learngpr27_db_user:ULRFO6tB4UjJjceI@cluster0.owm7yvg.mongodb.net/attendance_app?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=attendance_app_secret_key_2026_change_in_production
NODE_ENV=development
```

4. Save as: `.env` (with the dot at the beginning!)
5. Location: `/Users/gpr/Documents/Github projects/Attendance_App/backend/`
6. Make sure "Hide extension" is unchecked

### Option 2: Using VS Code or Any Code Editor

1. Open VS Code
2. File > Open Folder > Navigate to `Attendance_App/backend`
3. Create new file: `.env`
4. Paste the content above
5. Save

---

## 🔍 Your MongoDB Connection Details

Here's what's in your `.env` file:

```
MONGODB_URI=mongodb+srv://learngpr27_db_user:ULRFO6tB4UjJjceI@cluster0.owm7yvg.mongodb.net/attendance_app?retryWrites=true&w=majority&appName=Cluster0
```

**Breaking it down:**
- **Username:** `learngpr27_db_user`
- **Password:** `ULRFO6tB4UjJjceI`
- **Cluster:** `cluster0.owm7yvg.mongodb.net`
- **Database Name:** `attendance_app`

This connects your app to MongoDB Atlas cloud database.

---

## ✅ Test the Connection

After creating `.env`, test if it works:

```bash
cd "/Users/gpr/Documents/Github projects/Attendance_App/backend"
npm run dev
```

**Success looks like:**
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.owm7yvg.mongodb.net
```

**If you see an error:**
- Make sure `.env` file exists in `backend/` folder
- Check that the file is named exactly `.env` (not `.env.txt`)
- Verify the content is correct (no extra spaces or quotes)

---

## 🎯 Why This File is Needed

The backend code loads environment variables:

```javascript
// backend/server.js
const dotenv = require('dotenv');
dotenv.config();  // Reads .env file
```

Then uses them to connect:

```javascript
// backend/config/db.js
mongoose.connect(process.env.MONGODB_URI)
```

Without `.env`, `process.env.MONGODB_URI` is `undefined`, so the app can't connect to MongoDB.

---

## 🔐 Security Note

The `.env` file is in `.gitignore`, so it won't be committed to Git. This is intentional - it contains sensitive credentials.

---

## 📞 Still Having Issues?

If the `.env` file creation fails:

1. **Check folder location:**
   ```bash
   pwd
   # Should show: /Users/gpr/Documents/Github projects/Attendance_App/backend
   ```

2. **Try creating empty file first:**
   ```bash
   touch .env
   ```

3. **Then edit it:**
   ```bash
   nano .env
   # Paste the content, then Ctrl+X, Y, Enter to save
   ```

4. **Or use echo:**
   ```bash
   echo 'MONGODB_URI=mongodb+srv://learngpr27_db_user:ULRFO6tB4UjJjceI@cluster0.owm7yvg.mongodb.net/attendance_app?retryWrites=true&w=majority&appName=Cluster0' > .env
   echo 'PORT=5000' >> .env
   echo 'JWT_SECRET=attendance_app_secret_key_2026_change_in_production' >> .env
   echo 'NODE_ENV=development' >> .env
   ```

---

## ✅ Once .env is Created

You're ready to go! Continue with:

1. Install dependencies: `npm install`
2. Start server: `npm run dev`
3. Should see "MongoDB Connected" ✅

---

**This is the only manual step required. Everything else is automated! 🚀**
