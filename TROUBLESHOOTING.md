# 🔧 Troubleshooting Guide

Common issues and their solutions for the Attendance Tracker app.

## 🚨 Installation Issues

### ❌ `npm install` fails in backend

**Problem**: Error during package installation

**Solutions**:
1. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

2. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Try with legacy peer deps:
   ```bash
   npm install --legacy-peer-deps
   ```

### ❌ `npm install` fails in frontend

**Same solutions as backend above**

Additional: Check if you're in the correct directory:
```bash
pwd
# Should show: /Users/gpr/Documents/Github projects/Attendance_App/frontend
```

## 🔌 Connection Issues

### ❌ Backend won't start

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**: Port 5000 is already in use

1. Find and kill the process:
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

2. Or change the port in `backend/.env`:
   ```
   PORT=5001
   ```
   And update frontend proxy in `frontend/package.json`

### ❌ MongoDB connection failed

**Error**: `MongoServerError: Authentication failed`

**Solutions**:
1. Check `.env` file exists in backend folder
2. Verify MongoDB connection string is correct
3. Check your internet connection
4. Ensure MongoDB Atlas cluster is running

**Test connection**:
```bash
cd backend
node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI)"
```

### ❌ Frontend shows "Network Error"

**Problem**: Can't connect to backend

**Solutions**:
1. Ensure backend is running first:
   ```bash
   # In backend terminal, you should see:
   Server running in development mode on port 5000
   MongoDB Connected: cluster0.owm7yvg.mongodb.net
   ```

2. Check backend URL in frontend:
   - Should be `http://localhost:5000`
   - Check proxy in `frontend/package.json`

3. Test backend directly:
   ```bash
   curl http://localhost:5000
   ```

## 🔐 Authentication Issues

### ❌ Can't login after registration

**Problem**: Invalid credentials or token issues

**Solutions**:
1. Clear browser local storage:
   - Open DevTools (F12)
   - Go to Application > Local Storage
   - Clear all entries
   - Try logging in again

2. Check if user was created:
   - Login to MongoDB Atlas
   - Check users collection
   - Verify email exists

3. Try registering with different email

### ❌ "Not authorized" errors

**Problem**: JWT token invalid or expired

**Solution**: Logout and login again
```javascript
// Or manually clear localStorage
localStorage.removeItem('user');
localStorage.removeItem('token');
```

## 📊 Data Issues

### ❌ Attendance not updating

**Problem**: Subject statistics not changing

**Solutions**:
1. Refresh the page
2. Check if attendance was actually saved:
   - Open DevTools > Network tab
   - Mark attendance
   - Check if POST request succeeds (200 status)

3. Verify subject ID is correct

### ❌ Can't mark duplicate attendance

**This is intentional!** The system prevents marking attendance twice for the same:
- Subject
- Date
- Period

**Solution**: 
- Change the date, or
- Use a different period number

### ❌ Calculations seem wrong

**Check the math**:
```javascript
// Example
Total Classes: 40
Attended: 30
Percentage: (30/40) × 100 = 75%

// To reach 80%
Need: (80×40 - 100×30) / (100-80)
    = (3200 - 3000) / 20
    = 200 / 20
    = 10 more classes
```

If still wrong, report with details:
- Current total classes
- Current attended
- Target percentage
- Expected vs actual result

## 🎨 UI Issues

### ❌ Styles not loading

**Problem**: CSS not applied

**Solutions**:
1. Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Clear browser cache
3. Check browser console for CSS errors
4. Try different browser

### ❌ Icons not showing

**Problem**: Lucide icons not rendering

**Solution**:
```bash
cd frontend
npm install lucide-react --save
```

### ❌ Responsive issues on mobile

**Problem**: Layout broken on small screens

**Solutions**:
1. Use latest browser version
2. Clear cache
3. Check viewport meta tag in `index.html`
4. Test in Chrome DevTools mobile view

## 🔄 State Management Issues

### ❌ Data not updating after action

**Problem**: UI doesn't reflect changes

**Solutions**:
1. Check if API call succeeded (Network tab)
2. Manually refresh the page
3. Check React DevTools for state updates
4. Look for console errors

### ❌ Logged out unexpectedly

**Problem**: Session lost

**Reasons**:
- Token expired (30 days)
- Cleared browser data
- Changed password

**Solution**: Login again

## 🗂️ File/Folder Issues

### ❌ Module not found errors

**Error**: `Cannot find module 'X'`

**Solutions**:
1. Install missing dependency:
   ```bash
   npm install X
   ```

2. Reinstall all dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check if you're in correct directory

### ❌ Permission denied errors

**Error**: `EACCES: permission denied`

**Solution**:
```bash
sudo chown -R $USER /Users/gpr/Documents/Github\ projects/Attendance_App
```

Or use `sudo npm install` (not recommended)

## 🌐 Browser Issues

### ❌ App doesn't work in Safari

**Problem**: Some features broken in Safari

**Solutions**:
1. Update Safari to latest version
2. Try Chrome or Firefox
3. Disable Safari extensions
4. Clear Safari cache

### ❌ CORS errors

**Error**: `Access-Control-Allow-Origin`

**Solution**: Check CORS in `backend/server.js`:
```javascript
app.use(cors());
```

## 📱 Performance Issues

### ❌ App running slowly

**Solutions**:
1. Close unused tabs
2. Check browser extensions
3. Clear browser cache
4. Restart browser
5. Check internet speed

### ❌ API calls taking too long

**Solutions**:
1. Check internet connection
2. Verify MongoDB Atlas region
3. Look for console errors
4. Check database indexes

## 🧪 Testing Issues

### ❌ Can't test with sample data

**Solution**: Manually create test data:

1. Register a test account
2. Add 3-4 subjects
3. Mark attendance for each (mix of present/absent)
4. Create a weekly timetable
5. Add some class changes

**Quick test data script**:
```javascript
// In browser console after login
const subjects = ['Math', 'Physics', 'Chemistry', 'English'];
subjects.forEach(name => {
  fetch('/api/subjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ name })
  });
});
```

## 🔍 Debugging Tips

### Enable Detailed Logging

**Backend**:
```javascript
// In server.js, add:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

**Frontend**:
```javascript
// In AuthContext.js or component:
console.log('Current user:', user);
console.log('API response:', data);
```

### Check Terminal Output

**Backend should show**:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.owm7yvg.mongodb.net
```

**Frontend should show**:
```
Compiled successfully!
webpack compiled with 0 warnings
```

### Use Browser DevTools

1. **Console**: Check for JavaScript errors
2. **Network**: Monitor API calls
3. **Application**: Check localStorage
4. **React DevTools**: Inspect component state

### MongoDB Atlas Checks

1. Login to MongoDB Atlas
2. Check cluster status (should be green)
3. Verify database name: `attendance_app`
4. Check collections exist
5. Verify network access allows your IP

## 📞 Still Having Issues?

### Before asking for help, gather:

1. **Error message** (exact text)
2. **Console output** (both frontend and backend)
3. **Steps to reproduce** the issue
4. **What you've tried** already
5. **Browser and OS** version

### Check these first:

- [ ] Backend is running
- [ ] Frontend is running  
- [ ] MongoDB is connected
- [ ] No console errors
- [ ] Correct port numbers
- [ ] .env file exists
- [ ] Dependencies installed
- [ ] Logged in with valid account

### Common Quick Fixes (Try these first!)

```bash
# 1. Restart everything
# Stop backend (Ctrl+C) and frontend (Ctrl+C)
cd backend
npm run dev

# New terminal
cd frontend
npm start

# 2. Clear everything and restart
rm -rf backend/node_modules frontend/node_modules
cd backend && npm install
cd ../frontend && npm install

# 3. Clear browser data
# DevTools > Application > Clear storage
```

---

## ✅ Health Check Checklist

Run through this checklist:

- [ ] Node.js installed (`node --version`)
- [ ] npm working (`npm --version`)
- [ ] In correct directory (`pwd`)
- [ ] Backend dependencies installed (`ls backend/node_modules`)
- [ ] Frontend dependencies installed (`ls frontend/node_modules`)
- [ ] .env file exists (`ls backend/.env`)
- [ ] MongoDB URI in .env
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can register new account
- [ ] Can login
- [ ] Can add subject
- [ ] Can mark attendance

If all checked ✅, app is working perfectly!

---

**Most issues are solved by: restart, reinstall, or refresh! 🔄**
