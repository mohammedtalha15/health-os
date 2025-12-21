# Health OS - API Documentation

## Base URL

```
Development: http://localhost:8000
Production: https://api.healthos.com
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```http
Authorization: Bearer <your-token>
```

## Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /api/auth/login
Authenticate and receive access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Health Reports

#### GET /api/reports
Get all health reports for the authenticated user.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `type` (optional): Filter by report type

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "report_123",
      "title": "Blood Test Results",
      "type": "lab",
      "uploadDate": "2024-01-15T10:30:00Z",
      "status": "completed",
      "metrics": [...]
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### POST /api/reports/upload
Upload a new health report.

**Request:** `multipart/form-data`
- `file`: The report file (PDF, JPG, PNG)
- `title`: Report title
- `type`: Report type (lab, prescription, discharge, imaging, other)

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "report_123",
    "title": "Blood Test Results",
    "type": "lab",
    "uploadDate": "2024-01-15T10:30:00Z",
    "status": "processing"
  }
}
```

#### GET /api/reports/:id
Get a specific health report.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "report_123",
    "title": "Blood Test Results",
    "type": "lab",
    "uploadDate": "2024-01-15T10:30:00Z",
    "status": "completed",
    "fileUrl": "https://storage.healthos.com/reports/...",
    "metrics": [
      {
        "id": "metric_456",
        "name": "Hemoglobin",
        "value": 14.5,
        "unit": "g/dL",
        "refLow": 13.0,
        "refHigh": 17.0,
        "severity": "green",
        "explanation": "Your hemoglobin level is within normal range."
      }
    ]
  }
}
```

#### DELETE /api/reports/:id
Delete a health report.

**Response:** `204 No Content`

### Health Metrics

#### GET /api/metrics
Get health metrics for the authenticated user.

**Query Parameters:**
- `reportId` (optional): Filter by report
- `name` (optional): Filter by metric name
- `startDate` (optional): Filter by date range
- `endDate` (optional): Filter by date range

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "metric_456",
      "name": "Hemoglobin",
      "value": 14.5,
      "unit": "g/dL",
      "refLow": 13.0,
      "refHigh": 17.0,
      "severity": "green",
      "date": "2024-01-15",
      "trend": "stable"
    }
  ]
}
```

### Notifications

#### GET /api/notifications
Get notifications for the authenticated user.

**Query Parameters:**
- `unreadOnly` (optional): Show only unread notifications

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "notif_789",
      "title": "New Report Processed",
      "message": "Your blood test results are ready",
      "type": "info",
      "read": false,
      "createdAt": "2024-01-15T10:35:00Z",
      "actionUrl": "/reports/report_123"
    }
  ]
}
```

#### PATCH /api/notifications/:id/read
Mark a notification as read.

**Response:** `200 OK`

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "fields": {
      "email": "Must be a valid email address"
    }
  }
}
```

### Error Codes

- `VALIDATION_ERROR` (400): Invalid request data
- `AUTHENTICATION_ERROR` (401): Missing or invalid token
- `AUTHORIZATION_ERROR` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT_ERROR` (409): Resource conflict
- `RATE_LIMIT_ERROR` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

## Rate Limiting

- **Authenticated requests**: 100 requests per minute
- **Upload endpoints**: 10 requests per minute
- **Public endpoints**: 20 requests per minute

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

## Pagination

Paginated endpoints return:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Webhooks

Configure webhooks to receive real-time updates:

**Events:**
- `report.uploaded`
- `report.processed`
- `metric.critical`
- `user.registered`

**Payload:**
```json
{
  "event": "report.processed",
  "timestamp": "2024-01-15T10:35:00Z",
  "data": {
    "reportId": "report_123",
    "status": "completed"
  }
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import { apiClient } from '@/lib/apiClient';

// Upload report
const report = await apiClient.upload('/api/reports/upload', file);

// Get reports
const reports = await apiClient.get('/api/reports');

// Get specific report
const report = await apiClient.get(`/api/reports/${id}`);
```

### cURL

```bash
# Login
curl -X POST https://api.healthos.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}'

# Get reports
curl https://api.healthos.com/api/reports \
  -H "Authorization: Bearer <token>"
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for API version history.

## Support

For API support:
- Email: api-support@healthos.com
- Documentation: https://docs.healthos.com
- Status: https://status.healthos.com
