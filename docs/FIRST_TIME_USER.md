# First Time User - Step by Step Guide

## 🎯 Your Goal
Get the Lost & Found application running with a modern React UI in the next 10 minutes.

---

## ✅ Pre-flight Check (2 minutes)

Open PowerShell/Terminal and run:

```bash
java -version
mvn -version
node --version
npm --version
```

**All showing versions?** ✅ Great! Continue below.

**One or more showing "not found"?** 
- Install from: https://adoptium.net (Java), https://maven.apache.org, https://nodejs.org
- Restart PowerShell/Terminal after installing

---

## 🚀 Step 1: Start the Backend (2 minutes)

**Open PowerShell and navigate to project root:**

```bash
cd "C:\Users\anish\OneDrive\Desktop\PESU\SEM 6\OOAD\OOAD_NEW"
```

**Run the backend:**

```bash
mvnw spring-boot:run
```

Wait for this message:
```
Started LostfoundApplication in X.XXX seconds
```

**✅ Backend is running at http://localhost:8080**

---

## 🎨 Step 2: Start the Frontend (3 minutes)

**Open a NEW PowerShell window (keep the first one running):**

```bash
cd "C:\Users\anish\OneDrive\Desktop\PESU\SEM 6\OOAD\OOAD_NEW\frontend"
```

**Install dependencies (first time only):**

```bash
npm install
```

This takes 2-3 minutes. Wait for it to complete.

**Start the React app:**

```bash
npm start
```

Wait for:
```
Compiled successfully!
You can now view lostfound-ui in the browser.
```

**✅ Browser will automatically open at http://localhost:3000**

---

## 🎮 Step 3: Test the Application (3 minutes)

### Your browser opened automatically at `http://localhost:3000`

**You should see:**
- Blue header bar saying "Lost & Found Management System"
- Navigation menu button (☰) on the left
- Welcome dashboard with statistics

### Try adding an item:

1. Click menu button (☰) 
2. Click **"Items"** 
3. Click **"Add Item"** button (blue)
4. Fill the form:
   - **Name:** My Lost Wallet
   - **Description:** Brown leather wallet
   - **Category:** Personal
   - **Status:** FOUND
5. Click **"Save"**

**✅ Item appears in table!**

### Try other sections:

- **Dashboard** - Shows summary statistics
- **Claims** - File claims on items
- **Users** - Manage user accounts

---

## 🛑 Stopping the Application

When done:

**Terminal 1 (Backend):**
```
Press: Ctrl+C
```

**Terminal 2 (Frontend):**
```
Press: Ctrl+C
```

---

## 🔄 Next Time You Want to Run It

**Terminal 1:**
```bash
cd "C:\Users\anish\OneDrive\Desktop\PESU\SEM 6\OOAD\OOAD_NEW"
mvnw spring-boot:run
```

**Terminal 2:**
```bash
cd "C:\Users\anish\OneDrive\Desktop\PESU\SEM 6\OOAD\OOAD_NEW\frontend"
npm start
```

*(Note: `npm install` only needed once)*

---

## 🎨 Customization Quick Tips

### Change the Color Theme

Edit: `frontend/src/App.js`

Find this section (around line 25):
```javascript
primary: {
  main: '#2196F3',  // This is the blue
}
```

Change `'#2196F3'` to:
- `'#FF6F00'` - Orange
- `'#4CAF50'` - Green
- `'#9C27B0'` - Purple
- `'#FF5722'` - Red

Save and the colors auto-update! (refresh browser if needed)

### Add a New Item Field

Edit: `frontend/src/pages/ItemsPage.js`

In `formData` (around line 10), add:
```javascript
color: '',  // New field
```

Then in the form (around line 80), add:
```javascript
<TextField
  fullWidth
  label="Color"
  value={formData.color}
  onChange={(e) =>
    setFormData({ ...formData, color: e.target.value })
  }
  margin="normal"
/>
```

---

## 🆘 If Something Goes Wrong

### "Cannot connect to API" error

1. Check Terminal 1 (backend) is running
2. See blue line saying "Started LostfoundApplication"
3. If not, run: `mvnw spring-boot:run`

### "Cannot find npm"

```bash
npm --version
# If "not found", close PowerShell completely and reopen
```

### "Port 8080 already in use"

```bash
# Find and stop process
netstat -ano | findstr :8080
taskkill /PID <number> /F
```

### "npm install stuck"

```bash
# Cancel (Ctrl+C) and try:
npm cache clean --force
npm install
```

---

## 📚 Documentation (Bookmark These!)

- **QUICKSTART.md** - 5-minute overview
- **INSTALLATION_GUIDE.md** - Detailed setup
- **README_UI.md** - Complete documentation
- **TROUBLESHOOTING.md** - Fix common issues

---

## 🎯 What You've Accomplished

✅ Installed React UI
✅ Started backend (Spring Boot)
✅ Started frontend (React with Material-UI)
✅ Created and managed items
✅ Explored the application

---

## 🚀 Next Steps

1. **Explore more features**
   - Add claims
   - Create users
   - Try all buttons

2. **Customize the UI**
   - Change colors
   - Add new fields
   - Modify layouts

3. **Test the API**
   - Use Postman or curl
   - Test backend endpoints
   - Create test data

4. **Deploy to production** (when ready)
   - See INSTALLATION_GUIDE.md
   - Build with: `mvn clean install`
   - Run: `java -jar target/lostfound-0.0.1-SNAPSHOT.jar`

---

## 💡 Pro Tips

**Faster Debugging:**
- Open DevTools (F12) in browser
- Check Console tab for errors
- Check Network tab for API calls

**Live Editing:**
- Edit React files while running
- Save and page auto-refreshes
- No restart needed!

**Test Data:**
- Add items via UI
- Add users via UI
- Try all CRUD operations

**Check Backend:**
```bash
curl http://localhost:8080/api/items
```

---

## 🎉 You're All Set!

Your Lost & Found app is now running with a professional React UI!

**Current URLs:**
- **Frontend:** http://localhost:3000 (React UI)
- **Backend:** http://localhost:8080 (API)
- **Database:** H2 (in-memory, resets on restart)

**Questions?**
1. Check TROUBLESHOOTING.md
2. Check browser console (F12)
3. Check backend logs in Terminal 1

---

**Happy Building! 🚀**

Still have questions? Read:
- INSTALLATION_GUIDE.md (detailed setup)
- README_UI.md (all features)
- TROUBLESHOOTING.md (common issues)
