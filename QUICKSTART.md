# Quick Start Guide - React UI for Lost & Found

## 🚀 Get Started in 5 Minutes

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📋 Before Running

**Make sure your Spring Boot backend is running:**
```bash
# From project root
./mvnw spring-boot:run
# or
mvn spring-boot:run
```

Backend should be running on `http://localhost:8080`

## 🎨 What You'll See

1. **Dashboard** - Overview statistics
2. **Items** - Manage lost and found items
3. **Claims** - Handle item claims
4. **Users** - Manage users and roles

## 🔧 Common Tasks

### Create an Item
1. Click "Items" in menu
2. Click "Add Item" button
3. Fill in details
4. Click "Save"

### Create a Claim
1. Click "Claims" in menu
2. Click "New Claim" button
3. Enter Item ID and Claimant ID
4. Add proof of ownership
5. Click "Save"

### Approve/Reject Claim
1. Go to Claims page
2. Click ✓ (approve) or ✗ (reject) on pending claims

### Add a User
1. Click "Users" in menu
2. Click "Add User" button
3. Fill user details and select type
4. Click "Save"

## ⚠️ Troubleshooting

**"Cannot connect to server"**
- Check backend is running: http://localhost:8080
- Check terminal for errors

**"Port 3000 already in use"**
- Kill process on port 3000 or use different port
- Edit package.json to change port

**"Module not found"**
- Run `npm install` again
- Delete `node_modules` and try again

## 📱 Access from Another Computer

Edit `.env` in frontend directory:
```
REACT_APP_API_URL=http://<your-computer-ip>:8080/api
```

## 🎯 Build for Production

```bash
npm run build
```

Files ready in `build/` folder

## 📚 Learn More

See `README_UI.md` for detailed documentation

---

**Happy coding! 🎉**
