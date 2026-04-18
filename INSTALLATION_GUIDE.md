# Installation & Running Guide

## 📋 Prerequisites

Before getting started, ensure you have:
- **Java 17** or higher installed
- **Maven 3.6+** installed
- **Node.js 14+** installed
- **npm 6+** installed
- **Git** (optional, for version control)

### Verify Installation

```bash
# Check Java
java -version

# Check Maven
mvn -version

# Check Node.js
node --version

# Check npm
npm --version
```

---

## 🚀 Quick Start (Development Mode)

### Step 1: Start the Backend

**From the project root directory:**

```bash
# Using Maven Wrapper (Recommended)
./mvnw spring-boot:run

# OR using system Maven
mvn spring-boot:run
```

You should see:
```
Started LostfoundApplication in X.XXX seconds
```

The backend will be available at: `http://localhost:8080`

### Step 2: Start the Frontend

**Open a new terminal and navigate to the frontend directory:**

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start the React development server
npm start
```

The frontend will automatically open at: `http://localhost:3000`

### ✅ You're Done!

The application is now running with both frontend and backend!

---

## 📦 Production Build (Integrated Deployment)

### Build Everything with Maven

This creates a single JAR file that includes both backend and frontend:

```bash
# From project root
mvn clean install
```

This process will:
1. Install frontend dependencies
2. Build the React application
3. Copy frontend files to Spring Boot static directory
4. Build the Spring Boot JAR with everything included

### Run the Production Build

```bash
java -jar target/lostfound-0.0.1-SNAPSHOT.jar
```

Access the complete application at: `http://localhost:8080`

---

## 🔧 Common Setup Issues & Solutions

### Issue: "Port 8080 Already in Use"

```bash
# Windows - Find and kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8080
kill -9 <PID>

# OR change port in application.properties
# server.port=8081
```

### Issue: "Port 3000 Already in Use (React)"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>

# OR run on different port
PORT=3001 npm start
```

### Issue: "npm command not found"

- Install Node.js from: https://nodejs.org
- Restart terminal after installation
- Verify with: `npm --version`

### Issue: "mvn command not found"

- Install Maven from: https://maven.apache.org
- Or use Maven Wrapper: `./mvnw` (Windows: `mvnw.cmd`)

### Issue: "BUILD FAILURE" in Maven

```bash
# Clean and retry
mvn clean install

# If still fails, clear cache
rm -rf ~/.m2/repository
mvn clean install
```

### Issue: Frontend shows "Cannot connect to API"

1. Verify backend is running:
   ```bash
   curl http://localhost:8080/api/items
   ```

2. Check CORS configuration in `CorsConfig.java`

3. Verify API endpoint URLs in `frontend/src/services/api.js`

### Issue: npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf frontend/node_modules
rm -rf frontend/package-lock.json

# Reinstall
npm install
```

---

## 📁 Project Structure

```
OOAD_NEW/
├── src/
│   ├── main/java/com/project/lostfound/
│   │   ├── config/CorsConfig.java      ← CORS Configuration
│   │   ├── controller/
│   │   ├── service/
│   │   ├── model/
│   │   └── repository/
│   └── test/
├── frontend/                            ← React Application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── pom.xml                              ← Updated with frontend build
├── mvnw & mvnw.cmd                      ← Maven Wrapper
├── QUICKSTART.md
├── README_UI.md
└── UI_IMPLEMENTATION_SUMMARY.md
```

---

## 🎯 Development Workflow

### Option 1: Full Stack Development (Recommended)

```bash
# Terminal 1: Backend
./mvnw spring-boot:run

# Terminal 2: Frontend
cd frontend
npm start
```

**Advantages:**
- Live reload on both frontend and backend
- Easy debugging
- Better development experience

### Option 2: Frontend Only (for UI work)

```bash
cd frontend
npm start
```

Backend can be running separately or accessed via `http://localhost:8080`

### Option 3: Production Testing

```bash
# Build complete application
mvn clean install

# Run the built JAR
java -jar target/lostfound-0.0.1-SNAPSHOT.jar

# Access at http://localhost:8080
```

---

## 📊 Available APIs

### Items API
```
GET    /api/items              - List all items
GET    /api/items/{id}         - Get specific item
POST   /api/items              - Create new item
PUT    /api/items/{id}         - Update item
DELETE /api/items/{id}         - Delete item
```

### Claims API
```
GET    /api/claims             - List all claims
GET    /api/claims/{id}        - Get specific claim
POST   /api/claims             - Create new claim
PUT    /api/claims/{id}        - Update claim
DELETE /api/claims/{id}        - Delete claim
PUT    /api/claims/{id}/approve - Approve claim
PUT    /api/claims/{id}/reject  - Reject claim
```

### Users API
```
GET    /api/users              - List all users
GET    /api/users/{id}         - Get specific user
POST   /api/users              - Create new user
PUT    /api/users/{id}         - Update user
DELETE /api/users/{id}         - Delete user
```

---

## 🧪 Testing the Application

### Using the React UI

1. Open http://localhost:3000
2. Click on **Items** → Click **Add Item**
3. Fill in the form and save
4. Item should appear in the table
5. Try Edit and Delete operations

### Using Postman (Backend Testing)

1. Open Postman
2. Create request: `POST http://localhost:8080/api/items`
3. Set header: `Content-Type: application/json`
4. Body:
   ```json
   {
     "name": "Test Item",
     "description": "A test item",
     "category": "Electronics",
     "status": "FOUND"
   }
   ```
5. Click Send

### Using cURL (Command Line)

```bash
# Create item
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test item","category":"Electronics","status":"FOUND"}'

# Get all items
curl http://localhost:8080/api/items

# Get item by ID
curl http://localhost:8080/api/items/1
```

---

## 📚 Documentation

- **UI_IMPLEMENTATION_SUMMARY.md** - What was created
- **README_UI.md** - Complete UI documentation
- **QUICKSTART.md** - 5-minute quick start

---

## 🆘 Troubleshooting Checklist

Before contacting support, verify:

- [ ] Java 17+ installed: `java -version`
- [ ] Maven installed: `mvn -version`
- [ ] Node.js installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] Backend runs: `./mvnw spring-boot:run`
- [ ] Frontend runs: `cd frontend && npm start`
- [ ] Can access http://localhost:8080 (backend)
- [ ] Can access http://localhost:3000 (frontend)
- [ ] No port conflicts (8080, 3000)
- [ ] Internet connection (for downloading dependencies)

---

## 🚀 Next Steps

1. ✅ Start both frontend and backend
2. ✅ Test the CRUD operations
3. ✅ Customize the UI (colors, theme)
4. ✅ Add more features as needed
5. ✅ Deploy to production

---

## 📞 Support

For issues:
1. Check the troubleshooting section above
2. Review browser console (F12) for errors
3. Check terminal output for error messages
4. Verify all prerequisites are installed
5. Ensure ports 8080 and 3000 are available

---

**Happy Coding! 🎉**

Questions? Refer to the detailed documentation in README_UI.md
