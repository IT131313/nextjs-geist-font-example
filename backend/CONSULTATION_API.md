# Consultation System API Documentation

## Overview
This API provides endpoints for managing consultation scheduling for interior design services. Users can schedule consultations, select design preferences, and choose consultation methods.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Services

#### Get All Services
```http
GET /api/services
```
Returns all available services.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Designer Interior Profesional",
    "description": "Layanan desain interior profesional untuk mewujudkan ruangan impian Anda",
    "category": "interior",
    "price": null,
    "image_url": "/images/interior.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Service by ID
```http
GET /api/services/:id
```
Returns details of a specific service.

**Response:**
```json
{
  "id": 1,
  "name": "Designer Interior Profesional",
  "description": "Layanan desain interior profesional untuk mewujudkan ruangan impian Anda",
  "category": "interior",
  "price": null,
  "image_url": "/images/interior.jpg",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Consultation Types

#### Get All Consultation Types
```http
GET /api/consultations/types
```
Returns all available consultation methods.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Konsultasi Online",
    "description": "Konsultasi melalui video call atau chat online",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Kunjungan Langsung ke Rumah Anda",
    "description": "Tim desainer akan datang langsung ke lokasi Anda",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 3,
    "name": "Konsultasi Langsung di CV. Ariftama Tekindo",
    "description": "Konsultasi di kantor CV. Ariftama Tekindo",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Design Categories

#### Get All Design Categories
```http
GET /api/consultations/design-categories
```
Returns all available design categories (room types).

**Response:**
```json
[
  {
    "id": 1,
    "name": "Set Dapur",
    "image_url": "/images/kitchen-design.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Kantor",
    "image_url": "/images/office-design.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 3,
    "name": "Kamar Tidur",
    "image_url": "/images/bedroom-design.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 4,
    "name": "Rumah",
    "image_url": "/images/house-design.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Design Styles

#### Get All Design Styles
```http
GET /api/consultations/design-styles
```
Returns all available design styles.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Modern Kontemporer",
    "image_url": "/images/modern-contemporary.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Modern Klasik",
    "image_url": "/images/modern-classic.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Consultations

#### Create New Consultation
```http
POST /api/consultations
```
**Authentication Required**

Creates a new consultation booking.

**Request Body:**
```json
{
  "serviceId": 1,
  "consultationTypeId": 2,
  "designCategoryId": 1,
  "designStyleId": 1,
  "consultationDate": "2025-05-15",
  "consultationTime": "10:00",
  "address": "Jl. Contoh No. 123, Jakarta",
  "notes": "Catatan tambahan untuk konsultasi"
}
```

**Response:**
```json
{
  "message": "Consultation scheduled successfully",
  "consultationId": 1
}
```

#### Get User's Consultations
```http
GET /api/consultations
```
**Authentication Required**

Returns all consultations for the authenticated user.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "service_id": 1,
    "consultation_type_id": 2,
    "design_category_id": 1,
    "design_style_id": 1,
    "consultation_date": "2025-05-15",
    "consultation_time": "10:00",
    "address": "Jl. Contoh No. 123, Jakarta",
    "notes": "Catatan tambahan untuk konsultasi",
    "status": "pending",
    "created_at": "2024-01-01T00:00:00.000Z",
    "service_name": "Designer Interior Profesional",
    "service_description": "Layanan desain interior profesional",
    "consultation_type_name": "Kunjungan Langsung ke Rumah Anda",
    "design_category_name": "Set Dapur",
    "design_style_name": "Modern Kontemporer"
  }
]
```

#### Get Consultation by ID
```http
GET /api/consultations/:id
```
**Authentication Required**

Returns details of a specific consultation.

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "service_id": 1,
  "consultation_type_id": 2,
  "design_category_id": 1,
  "design_style_id": 1,
  "consultation_date": "2025-05-15",
  "consultation_time": "10:00",
  "address": "Jl. Contoh No. 123, Jakarta",
  "notes": "Catatan tambahan untuk konsultasi",
  "status": "pending",
  "created_at": "2024-01-01T00:00:00.000Z",
  "service_name": "Designer Interior Profesional",
  "service_description": "Layanan desain interior profesional",
  "service_image": "/images/interior.jpg",
  "consultation_type_name": "Kunjungan Langsung ke Rumah Anda",
  "consultation_type_description": "Tim desainer akan datang langsung ke lokasi Anda",
  "design_category_name": "Set Dapur",
  "design_category_image": "/images/kitchen-design.jpg",
  "design_style_name": "Modern Kontemporer",
  "design_style_image": "/images/modern-contemporary.jpg"
}
```

#### Update Consultation Status
```http
PATCH /api/consultations/:id/status
```
**Authentication Required**

Updates the status of a consultation.

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Valid Status Values:**
- `pending` - Menunggu konfirmasi
- `confirmed` - Dikonfirmasi
- `in_progress` - Sedang berlangsung
- `completed` - Selesai
- `cancelled` - Dibatalkan

**Response:**
```json
{
  "message": "Consultation status updated successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Usage Example

### Complete Consultation Booking Flow

1. **Get Service Details**
```javascript
const response = await fetch('/api/services/1');
const service = await response.json();
```

2. **Get Available Options**
```javascript
const [types, categories, styles] = await Promise.all([
  fetch('/api/consultations/types').then(r => r.json()),
  fetch('/api/consultations/design-categories').then(r => r.json()),
  fetch('/api/consultations/design-styles').then(r => r.json())
]);
```

3. **Create Consultation**
```javascript
const consultation = await fetch('/api/consultations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    serviceId: 1,
    consultationTypeId: 2,
    designCategoryId: 1,
    designStyleId: 1,
    consultationDate: '2025-05-15',
    consultationTime: '10:00',
    address: 'Jl. Contoh No. 123, Jakarta',
    notes: 'Catatan tambahan'
  })
});
```

4. **Get User's Consultations**
```javascript
const consultations = await fetch('/api/consultations', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(r => r.json());
