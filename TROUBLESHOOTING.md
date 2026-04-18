# Troubleshooting Guide

## 🔴 Application Won't Start

### Backend won't start

**Error: "Port 8080 already in use"**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8080
kill -9 <PID>

# Change port (edit application.properties)
server.port=8081
```

**Error: "Java command not found"**
- Install Java 17 from https://adoptium.net
- Add Java to PATH
- Restart terminal

**Error: "BUILD FAILURE"**
```bash
mvn clean install
# If still fails:
rm -rf ~/.m2/repository
mvn clean install
```

### Frontend won't start

**Error: "Port 3000 already in use"**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

**Error: "npm command not found"**
- Install Node.js from https://nodejs.org
- Restart terminal
- Verify: `npm --version`

**Error: "Module not found"**
```bash
cd frontend
npm install
```

---

## 🟡 Connection Issues

### Frontend can't connect to backend

**Symptoms:** Blank page, "Cannot GET" error, API calls failing

**Solution 1: Check backend is running**
```bash
# Terminal 1: Start backend
./mvnw spring-boot:run

# Terminal 2: Test connection
curl http://localhost:8080/api/items
```

**Solution 2: Check CORS configuration**
- Verify `CorsConfig.java` exists in project
- Check it allows localhost:3000

**Solution 3: Check API URL**
- Frontend should call: `http://localhost:8080/api`
- Check `frontend/src/services/api.js`

### Backend can't connect to database

**Error: "Database connection failed"**
- H2 database runs in-memory by default
- Check `application.properties`
- Ensure no other instance is blocking database

---

## 🟡 Build Issues

### npm install fails

```bash
# Clear cache
npm cache clean --force

# Delete and reinstall
rm -rf frontend/node_modules
rm -rf frontend/package-lock.json
npm install
```

### Maven build fails

```bash
# Clean build
mvn clean install

# Check Java version
java -version  # Should be 17+

# Verify Maven version
mvn -version   # Should be 3.6+
```

### Frontend build takes too long

- First build is slow (downloads Node, npm, dependencies)
- Subsequent builds are faster
- Close unnecessary applications to free RAM

---

## 🔴 Runtime Errors

### Tables showing "No data found"

**Check 1:** Backend is running
```bash
curl http://localhost:8080/api/items
```

**Check 2:** Items exist in database
- Add some test data via API
- Try with Postman or curl

**Check 3:** Browser console (F12)
- Look for error messages
- Check Network tab for failed requests

### Forms won't submit

**Check 1:** Console errors (F12)
- Open DevTools
- Look for red errors in Console tab

**Check 2:** API endpoint exists
- Verify controller method exists
- Check path matches in frontend/src/services/api.js

**Check 3:** Data format
- Ensure JSON is valid
- Check backend validation rules

### Buttons don't work

**Check 1:** Browser console for JavaScript errors (F12)

**Check 2:** Network requests in browser
- Open DevTools → Network tab
- Perform action
- Check if request was sent and response

**Check 3:** Backend logs
- Check terminal running backend
- Look for error messages

---

## 🟡 Performance Issues

### App is slow

**Solution 1: Close unnecessary tabs/programs**
- Browser extensions can slow React dev server
- Close other applications to free RAM

**Solution 2: Clear browser cache**
```bash
# Chrome: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
# Firefox: Same shortcut
```

**Solution 3: Restart development servers**
```bash
# Stop both servers (Ctrl+C)
# Restart backend: ./mvnw spring-boot:run
# Restart frontend: npm start
```

### Tables are sluggish with many rows

- Consider adding pagination
- Implement virtual scrolling for large datasets
- Filter data on backend instead of frontend

---

## 🟡 Data Issues

### Data not saving

**Check 1:** No error messages?
- Check browser console (F12)
- Check backend logs

**Check 2:** Database issue?
- Restart backend: `./mvnw spring-boot:run`
- Database is in-memory, data resets on restart

**Check 3:** API response**
```bash
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test","category":"Cat","status":"FOUND"}'
```

### Deleted data still showing

- Refresh page: F5 or Cmd+R
- Check if delete was successful in browser Network tab
- Check backend logs for errors

### Can't create items with specific values

- Check validation rules in controller
- Try simpler values first
- Check Item model for required fields

---

## 🟡 Deployment Issues

### Production build (JAR) won't start

```bash
# Rebuild
mvn clean install

# Check JAR was created
ls -la target/

# Run with verbose logging
java -jar target/lostfound-0.0.1-SNAPSHOT.jar --debug
```

### Static files not serving

- Ensure frontend is built: `npm run build`
- Check frontend build output in `frontend/build/`
- Verify pom.xml has maven-resources-plugin configured

---

## 🔍 Diagnostic Steps

Before reporting an issue, collect this information:

1. **Environment**
   ```bash
   java -version
   mvn -version
   node --version
   npm --version
   ```

2. **Error message** (exact text)

3. **Steps to reproduce**

4. **What you expected to happen**

5. **What actually happened**

6. **Browser console errors** (F12)

7. **Backend terminal output**

8. **Network requests** (DevTools → Network tab)

---

## 🔧 Advanced Debugging

### Enable backend debug logging

Edit `application.properties`:
```properties
logging.level.root=DEBUG
logging.level.com.project.lostfound=DEBUG
```

### Enable frontend debug mode

Create `frontend/.env`:
```
REACT_APP_DEBUG=true
```

### Check API responses in browser

1. Open DevTools (F12)
2. Go to Network tab
3. Perform an action
4. Click request to see response

### Monitor backend logs in real-time

```bash
# While backend is running, in another terminal:
# macOS/Linux
tail -f /path/to/logs

# Windows
Get-Content file.log -Wait
```

---

## 📞 Need Help?

1. **Check this document** - Most issues covered
2. **Check browser console** (F12) - JavaScript errors
3. **Check terminal output** - Backend errors
4. **Restart servers** - Often fixes issues
5. **Clear browser cache** - Sometimes helps
6. **Verify prerequisites** - Java, Maven, Node.js installed

---

## ✅ Verification Checklist

If something isn't working, verify:

- [ ] Java 17+ installed and in PATH
- [ ] Maven installed and in PATH
- [ ] Node.js 14+ installed and in PATH
- [ ] npm 6+ installed
- [ ] Ports 8080 and 3000 are free
- [ ] Internet connection available
- [ ] Frontend dependencies installed: `npm install`
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:8080
- [ ] Can access http://localhost:3000
- [ ] No API connection errors in console
- [ ] Database (H2) is accessible

---

**Common fixes summary:**
1. Restart both servers
2. Clear npm cache: `npm cache clean --force`
3. Clear Maven cache: `rm -rf ~/.m2/repository`
4. Clear browser cache: DevTools → Settings
5. Verify all prerequisites installed

If issue persists, check the specific section above!
