# 🎨 UI Preview & Quick Reference

## Visual Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ ☰  Lost & Found Management System                    🔔 Notifications │ ← App Bar
├─────────────────────────────────────────────────────────────────────┤
│ ┌────────────────┐ ┌──────────────────────────────────────────────┐ │
│ │ Menu           │ │ Dashboard / Items / Claims / Users           │ │
│ ├────────────────┤ ├──────────────────────────────────────────────┤ │
│ │ ☑ Dashboard    │ │ Welcome to Dashboard                         │ │
│ │ 📦 Items       │ ├──────────────────────────────────────────────┤ │
│ │ 📋 Claims      │ │  [Total Items: 5]  [Total Claims: 3]        │ │
│ │ 👥 Users       │ │  [Total Users: 10]                           │ │
│ │                │ │                                              │ │
│ │                │ │  Statistics cards with auto-refresh          │ │
│ └────────────────┘ └──────────────────────────────────────────────┘ │
│                    Material Design responsive layout                  │
└─────────────────────────────────────────────────────────────────────┘
│                    © 2024 Lost & Found Application                    │ ← Footer
└─────────────────────────────────────────────────────────────────────┘
```

### Items Page Layout
```
┌─────────────────────────────────────────────────────┐
│ Items Management                      [+ Add Item]  │
├────────────┬──────────────┬──────────┬───────┬──────┤
│ ID │ Name │ Description  │ Category │ Status│ Act. │
├────────────┼──────────────┼──────────┼───────┼──────┤
│ 1  │ Wallet  │ Brown leather│ Personal│ ✅ Found│ ✏️ 🗑️ │
│ 2  │ Keys    │ Silver keyring│ Personal│ ❌ Lost │ ✏️ 🗑️ │
│ 3  │ Phone   │ iPhone 13   │ Electronics│ ⚠️ Claimed│ ✏️ 🗑️ │
└────────────┴──────────────┴──────────┴───────┴──────┘
```

### Claims Page Layout
```
┌─────────────────────────────────────────────────────┐
│ Claims Management                  [+ New Claim]    │
├────────┬──────────┬──────────┬────────┬────────┬────┤
│ ID │ Item ID│ Claimant ID│ Status │ Proof   │Act.│
├────────┼──────────┼──────────┼────────┼────────┼────┤
│ 1  │ 1      │ 101       │ ⏳ Pending│ Photo...│✓ ✗ │
│ 2  │ 3      │ 105       │ ✅ Approved│ Doc... │ ✏️ 🗑️│
│ 3  │ 2      │ 102       │ ❌ Rejected│ Form...│ ✏️ 🗑️│
└────────┴──────────┴──────────┴────────┴────────┴────┘
```

### Users Page Layout
```
┌────────────────────────────────────────────────────┐
│ Users Management                   [+ Add User]    │
├────────┬──────────┬────────────┬────────┬──────┬──┤
│ ID │ Name    │ Email      │ Phone  │ Type  │ Act│
├────────┼──────────┼────────────┼────────┼──────┼──┤
│ 101│ John    │ john@ex.com│ 999-1  │ 📝 Reporter│ ✏️ 🗑️│
│ 102│ Sarah   │ sarah@ex..│ 999-2  │ 📦 Claimant│ ✏️ 🗑️│
│ 103│ Admin   │ admin@ex..│ 999-3  │ ⚙️ Moderator│ ✏️ 🗑️│
└────────┴──────────┴────────────┴────────┴──────┴──┘
```

---

## 🎯 Color Scheme

```
Primary Color:    #2196F3 (Blue)        - Buttons, headers, focus
Secondary Color:  #FF6F00 (Orange)      - Accents, highlights
Success:          #4CAF50 (Green)       - Approved, Found status
Warning:          #FF9800 (Amber)       - Pending status
Error:            #F44336 (Red)         - Rejected, Lost status
Background:       #F5F5F5 (Light Gray)  - Page background
```

---

## ⚡ Quick Commands

### 🚀 Start Everything

```bash
# Terminal 1: Backend
cd "C:\Users\anish\OneDrive\Desktop\PESU\SEM 6\OOAD\OOAD_NEW"
mvnw spring-boot:run

# Terminal 2: Frontend
cd "C:\Users\anish\OneDrive\Desktop\PESU\SEM 6\OOAD\OOAD_NEW\frontend"
npm start
```

### 📦 Build & Deploy

```bash
# Build production JAR
mvn clean install

# Run JAR
java -jar target/lostfound-0.0.1-SNAPSHOT.jar

# Access at http://localhost:8080
```

### 🛠️ Development Tasks

```bash
# Frontend only (API through proxy)
npm start --prefix frontend

# Test backend API
curl http://localhost:8080/api/items

# Install dependencies (first time)
cd frontend && npm install

# Clear npm cache
npm cache clean --force
```

### 🧹 Cleanup

```bash
# Stop servers
Ctrl+C  # Press in each terminal

# Clear node modules
rm -r frontend/node_modules

# Clear Maven cache
rm -r ~/.m2/repository

# Stop processes on ports
netstat -ano | findstr :8080
taskkill /PID <number> /F
```

---

## 🔗 Important URLs

| URL | Purpose | Status |
|-----|---------|--------|
| http://localhost:3000 | React Frontend | Running when `npm start` executed |
| http://localhost:8080 | Spring Boot API | Running when backend started |
| http://localhost:8080/api/items | Items Endpoint | Test in browser |
| http://localhost:8080/h2-console | H2 Database | Browser-based DB management |

---

## 📝 Form Fields Reference

### Add Item Form
```
✓ Name (required)           → "My Lost Wallet"
✓ Description             → "Brown leather, has ID inside"
✓ Category                → "Personal Items"
✓ Status (dropdown)       → "FOUND" / "LOST" / "CLAIMED"
```

### New Claim Form
```
✓ Item ID (required)      → 1, 2, 3... (from items)
✓ Claimant ID (required)  → 101, 102, 103... (from users)
✓ Proof of Ownership      → "Contains my name and ID"
✓ Status (dropdown)       → "PENDING" / "APPROVED" / "REJECTED"
```

### Add User Form
```
✓ Name (required)         → "John Doe"
✓ Email (required)        → "john@example.com"
✓ Phone                   → "999-123-4567"
✓ User Type (dropdown)    → "REPORTER" / "CLAIMANT" / "MODERATOR"
```

---

## 🎛️ Component Features

### Buttons
- **Blue (Primary)** - Create/Save/Confirm actions
- **Red (Danger)** - Delete actions
- **Green (Success)** - Approve actions
- **Orange (Warning)** - Reject actions

### Status Indicators
- **✅ Green** - FOUND / APPROVED / Active
- **❌ Red** - LOST / REJECTED / Inactive
- **⚠️ Orange** - PENDING / PROCESSING
- **ℹ️ Blue** - INFO / REPORTER

### Icons
- 🏠 Dashboard
- 📦 Items
- 📋 Claims
- 👥 Users
- ✏️ Edit
- 🗑️ Delete
- ✓ Approve
- ✗ Reject
- 🔔 Notifications

---

## 📊 Dashboard Statistics Cards

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   Total Items    │  │  Total Claims    │  │   Total Users    │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│  📦              │  │  📋              │  │  👥              │
│                  │  │                  │  │                  │
│      15          │  │      8           │  │      23          │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## 🔄 Data Flow

```
User Action (Click Button)
        ↓
React Component (ItemsPage.js)
        ↓
API Call (axios call to /api/items)
        ↓
Spring Boot Controller (ItemController)
        ↓
Service Layer (ItemService)
        ↓
Repository (ItemRepository)
        ↓
H2 Database
        ↓
Response Back to Frontend
        ↓
Component State Updates
        ↓
UI Re-renders
```

---

## 🧪 Testing Scenarios

### Test 1: Create Item
1. Open http://localhost:3000
2. Click "Items" in menu
3. Click "Add Item" button
4. Fill form with test data
5. Click "Save"
6. ✓ Item appears in table

### Test 2: Edit Item
1. Click pencil icon on any item
2. Modify the data
3. Click "Save"
4. ✓ Changes reflected in table

### Test 3: Delete Item
1. Click trash icon on any item
2. Confirm deletion
3. ✓ Item removed from table

### Test 4: Create Claim
1. Click "Claims" in menu
2. Click "New Claim"
3. Enter Item ID and Claimant ID
4. Click "Save"
5. ✓ Claim appears in table with PENDING status

### Test 5: Approve Claim
1. Find PENDING claim
2. Click green checkmark icon
3. ✓ Status changes to APPROVED

### Test 6: Dashboard Stats
1. Go to Dashboard
2. Create items/claims/users
3. ✓ Dashboard numbers update

---

## 🎨 Customization Quick Reference

### Change Primary Color
**File:** `frontend/src/App.js`
**Line:** ~25
```javascript
primary: { main: '#2196F3' }  // Change this color
```

### Change App Title
**File:** `frontend/src/App.js`
**Line:** ~160
```javascript
Lost & Found Management System  // Change this text
```

### Add New Menu Item
**File:** `frontend/src/App.js`
**Line:** ~70
```javascript
menuItems.push({ id: 'reports', label: 'Reports', icon: <ChartIcon /> })
```

### Change Font
**File:** `frontend/public/index.html`
**Line:** ~12
```html
family=Roboto  // Change to any Google Font
```

---

## 📱 Responsive Breakpoints

| Screen Size | Layout |
|------------|--------|
| **<600px** | Mobile - Drawer navigation |
| **600-960px** | Tablet - Side-by-side |
| **>960px** | Desktop - Full layout |

All components automatically adapt!

---

## 🐛 Debug Mode

**Open Browser DevTools:**
```
Windows/Linux: F12 or Ctrl+Shift+I
Mac: Cmd+Option+I
```

**Check:**
- Console tab → JavaScript errors
- Network tab → API calls
- Elements tab → HTML structure
- Application tab → LocalStorage/Cookies

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| F5 | Refresh page |
| F12 | Open DevTools |
| Ctrl+Shift+Delete | Clear cache |
| Tab | Navigate form fields |
| Enter | Submit form / Confirm |
| Escape | Close dialog |

---

## 🚀 Performance Tips

1. **Clear browser cache** (F12 → Clear)
2. **Close unnecessary browser tabs**
3. **Restart both servers** if slow
4. **Check network tab** for slow API calls
5. **Monitor backend logs** for issues

---

## 📞 Quick Support Reference

| Issue | Command |
|-------|---------|
| Port 8080 taken | `netstat -ano \| findstr :8080` |
| Port 3000 taken | `netstat -ano \| findstr :3000` |
| npm not found | Reinstall Node.js |
| mvn not found | Use `mvnw` instead |
| Backend error | Check terminal output |
| Frontend error | Open DevTools (F12) |

---

## 🎯 Next Commands to Try

```bash
# After both are running, try:

# 1. Add an item
# Visit http://localhost:3000 → Items → Add Item

# 2. Test API directly
curl http://localhost:8080/api/items

# 3. View in Postman
# Import: POST http://localhost:8080/api/items

# 4. Check database
# Visit: http://localhost:8080/h2-console

# 5. Build for production
mvn clean install
```

---

## 📚 File to Edit for Common Changes

| What to Change | File to Edit |
|----------------|--------------|
| Colors | `frontend/src/App.js` |
| Menu items | `frontend/src/App.js` |
| Form fields | `frontend/src/pages/*.js` |
| API endpoints | `frontend/src/services/api.js` |
| Page title | `frontend/public/index.html` |
| Backend port | `application.properties` |
| CORS settings | `CorsConfig.java` |

---

**Bookmark this page for quick reference! 📌**

Remember: **Right-click → Print to PDF** to save locally!
