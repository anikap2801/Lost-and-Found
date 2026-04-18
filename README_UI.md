# Lost & Found - React UI Setup Guide

## Overview

This is a modern React-based UI for the Lost & Found application, built with Material-UI for a professional, responsive design. The frontend integrates seamlessly with your existing Spring Boot backend.

## Features

- **Dashboard**: Overview of items, claims, and users statistics
- **Items Management**: Create, read, update, delete lost and found items
- **Claims Management**: Manage item claims with approval/rejection capabilities
- **Users Management**: Manage reporters, claimants, and moderators
- **Modern UI**: Built with Material-UI for professional appearance
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Feedback**: Loading states, error handling, and success messages

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spring Boot backend running on `http://localhost:8080`

## Installation & Setup

### Option 1: Quick Setup with npm (Development)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will open at `http://localhost:3000`

### Option 2: Build and Deploy with Spring Boot (Production)

The project includes Maven plugins to automatically build the React frontend and serve it from Spring Boot:

```bash
# From project root, run Maven build
mvn clean install

# The built frontend files will be copied to src/main/resources/static

# Start the Spring Boot application
java -jar target/lostfound-0.0.1-SNAPSHOT.jar

# Access the UI at http://localhost:8080
```

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── pages/              # Page components
│   │   ├── Dashboard.js    # Dashboard page
│   │   ├── ItemsPage.js    # Items management
│   │   ├── ClaimsPage.js   # Claims management
│   │   └── UsersPage.js    # Users management
│   ├── services/
│   │   └── api.js          # API communication layer
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
└── README.md               # This file
```

## Available Scripts

### Development

```bash
npm start
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production Build

```bash
npm run build
```
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build.

### Testing

```bash
npm test
```
Launches the test runner (when test files are added).

## API Integration

The frontend communicates with the Spring Boot backend via REST API endpoints:

### Base URL
- Development: `http://localhost:8080/api`
- Production: Auto-configured

### Available Endpoints (as configured in `src/services/api.js`)

**Items**
- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

**Claims**
- `GET /api/claims` - Get all claims
- `GET /api/claims/{id}` - Get claim by ID
- `POST /api/claims` - Create new claim
- `PUT /api/claims/{id}` - Update claim
- `DELETE /api/claims/{id}` - Delete claim
- `PUT /api/claims/{id}/approve` - Approve claim
- `PUT /api/claims/{id}/reject` - Reject claim

**Users**
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Customization

### Changing Theme Colors

Edit `src/App.js` and modify the `createTheme()` object:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#YOUR_COLOR',
    },
    secondary: {
      main: '#YOUR_COLOR',
    },
  },
});
```

### Adding New Pages

1. Create a new file in `src/pages/` (e.g., `ReportsPage.js`)
2. Add it to the navigation in `src/App.js`
3. Add corresponding API methods in `src/services/api.js`

### Modifying API Endpoints

Edit `src/services/api.js` to update API calls or add new endpoints.

## Troubleshooting

### Frontend not connecting to backend

1. Ensure Spring Boot is running on `http://localhost:8080`
2. Check CORS configuration is enabled in `CorsConfig.java`
3. Verify API endpoints match your backend routes
4. Check browser console for error messages

### Build fails during Maven build

1. Ensure Node.js is installed: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then retry
4. Check internet connection for downloading dependencies

### Port conflicts

- **React dev server**: Change port in package.json scripts
- **Spring Boot**: Change in `application.properties`: `server.port=8081`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

Key libraries used:
- **React**: UI framework
- **Material-UI (@mui/material)**: Component library
- **Axios**: HTTP client
- **React Router**: Navigation (ready for future expansion)

## Performance Tips

1. Use development mode for debugging
2. Production build is optimized for size and speed
3. Lazy load pages as needed
4. Use React DevTools for profiling

## Security Notes

- Never commit sensitive data (API keys, credentials)
- Use environment variables for API URLs
- Implement proper authentication in production
- Sanitize user input on the backend

## Next Steps

1. Customize the UI design to match your brand
2. Add form validation
3. Implement user authentication
4. Add file upload for documents
5. Add export/report generation
6. Implement pagination for large datasets

## Support & Troubleshooting

For issues:
1. Check browser console for errors (F12)
2. Check backend logs
3. Verify network requests in browser DevTools
4. Ensure all dependencies are installed: `npm install`

## License

This project is part of the Lost & Found Application system.
