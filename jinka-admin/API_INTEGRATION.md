# API Integration Guide

This guide explains how to connect the admin panel to your backend API.

## Overview

The admin panel is built to work with RESTful APIs. The backend team should provide endpoints for all CRUD operations.

## Configuration

### 1. Set API Base URL

In `src/App.jsx`, update the API URL:

```javascript
const API_URL = "https://api.jinka.gov.et"; // Your actual API endpoint
```

### 2. API Endpoints Expected

The application expects the following REST endpoints:

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

#### Citizens
- `GET /citizens` - List all citizens
- `GET /citizens/:id` - Get single citizen
- `POST /citizens` - Create citizen
- `PUT /citizens/:id` - Update citizen
- `DELETE /citizens/:id` - Delete citizen

#### Departments
- `GET /departments` - List all departments
- `GET /departments/:id` - Get single department
- `POST /departments` - Create department
- `PUT /departments/:id` - Update department
- `DELETE /departments/:id` - Delete department

#### Announcements
- `GET /announcements` - List all announcements
- `GET /announcements/:id` - Get single announcement
- `POST /announcements` - Create announcement
- `PUT /announcements/:id` - Update announcement
- `DELETE /announcements/:id` - Delete announcement

#### Projects
- `GET /projects` - List all projects
- `GET /projects/:id` - Get single project
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

#### Events
- `GET /events` - List all events
- `POST /events` - Create event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event

#### Documents
- `GET /documents` - List all documents
- `POST /documents` - Upload document
- `GET /documents/:id/download` - Download document
- `DELETE /documents/:id` - Delete document

#### Reports
- `GET /reports/statistics` - Get dashboard statistics
- `GET /reports/activities` - Get recent activities
- `GET /reports/performance` - Get department performance

#### Messages
- `GET /messages` - List all messages
- `GET /messages/:id` - Get single message
- `POST /messages` - Send message
- `DELETE /messages/:id` - Delete message

## API Response Format

The API should return responses in this format:

### Success Response
```json
{
  "data": [...],
  "total": 100,
  "success": true
}
```

### Error Response
```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  },
  "success": false
}
```

## Authentication

### JWT Token

The application expects JWT tokens for authentication:

1. User logs in via `/auth/login`
2. API returns JWT token
3. Token is stored in localStorage
4. Token is sent in Authorization header for all requests

### Adding Authentication Headers

The data provider automatically adds authentication headers. To customize, edit the axios instance in `src/App.jsx`:

```javascript
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Pagination

The API should support pagination with these query parameters:
- `page` - Page number (starting from 1)
- `pageSize` - Number of items per page
- `sort` - Sort field
- `order` - Sort order (asc/desc)

Example: `GET /citizens?page=1&pageSize=10&sort=name&order=asc`

## Filtering and Search

The API should support filtering:
- `search` - Search query
- `filter` - JSON object with filter criteria

Example: `GET /citizens?search=john&filter={"status":"active"}`

## File Uploads

For document uploads, use multipart/form-data:

```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('category', 'Finance');

axios.post('/documents', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

## Error Handling

The application handles these HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (redirects to login)
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Testing API Integration

1. Update API_URL in `src/App.jsx`
2. Ensure backend is running
3. Test login functionality
4. Check browser console for API calls
5. Verify data is loading correctly

## CORS Configuration

Ensure your backend allows requests from the frontend domain:

```javascript
// Example for Express.js
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Environment Variables

For different environments, create `.env` files:

```bash
# .env.development
VITE_API_URL=http://localhost:8000

# .env.production
VITE_API_URL=https://api.jinka.gov.et
```

Then use in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

## Support

If you encounter API integration issues:
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Confirm authentication tokens are valid
4. Check CORS configuration
5. Contact backend team for API documentation
