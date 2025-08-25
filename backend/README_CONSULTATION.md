# Consultation System Backend

## Overview
Backend sistem konsultasi untuk layanan desain interior CV. Ariftama Tekindo. Sistem ini memungkinkan pengguna untuk menjadwalkan konsultasi dengan desainer interior profesional.

## Features
- ✅ Manajemen layanan (services)
- ✅ Penjadwalan konsultasi
- ✅ Pilihan jenis konsultasi (Online, Kunjungan, Kantor)
- ✅ Kategori desain (Set Dapur, Kantor, Kamar Tidur, Rumah)
- ✅ Gaya desain (Modern Kontemporer, Modern Klasik, dll)
- ✅ Autentikasi pengguna dengan JWT
- ✅ Status tracking konsultasi

## Database Schema

### Tables Created:
1. **consultation_types** - Jenis konsultasi
2. **design_categories** - Kategori kebutuhan desain
3. **design_styles** - Gaya desain
4. **consultations** - Data konsultasi utama

## API Endpoints

### Services
- `GET /api/services` - Dapatkan semua layanan
- `GET /api/services/:id` - Dapatkan detail layanan

### Consultation Data
- `GET /api/consultations/types` - Dapatkan jenis konsultasi
- `GET /api/consultations/design-categories` - Dapatkan kategori desain
- `GET /api/consultations/design-styles` - Dapatkan gaya desain

### Consultations (Requires Authentication)
- `POST /api/consultations` - Buat konsultasi baru
- `GET /api/consultations` - Dapatkan konsultasi pengguna
- `GET /api/consultations/:id` - Dapatkan detail konsultasi
- `PATCH /api/consultations/:id/status` - Update status konsultasi

## Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Initialize Database & Seed Data**
```bash
npm run init-consultation-system
npm run seed-services
```

3. **Start Server**
```bash
npm start
# or for development
npm run dev
```

## Environment Variables
Create a `.env` file:
```
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Usage Example

### 1. Get Available Options
```javascript
// Get consultation types
const types = await fetch('/api/consultations/types').then(r => r.json());

// Get design categories
const categories = await fetch('/api/consultations/design-categories').then(r => r.json());

// Get design styles
const styles = await fetch('/api/consultations/design-styles').then(r => r.json());
```

### 2. Create Consultation
```javascript
const consultation = await fetch('/api/consultations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    serviceId: 1,
    consultationTypeId: 2, // Kunjungan Langsung
    designCategoryId: 1,   // Set Dapur
    designStyleId: 1,      // Modern Kontemporer
    consultationDate: '2025-05-15',
    consultationTime: '10:00',
    address: 'Jl. Contoh No. 123, Jakarta',
    notes: 'Catatan tambahan'
  })
});
```

### 3. Get User Consultations
```javascript
const consultations = await fetch('/api/consultations', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(r => r.json());
```

## Data Structure

### Consultation Types
1. **Konsultasi Online** - Video call atau chat online
2. **Kunjungan Langsung ke Rumah Anda** - Tim datang ke lokasi
3. **Konsultasi Langsung di CV. Ariftama Tekindo** - Di kantor

### Design Categories
1. **Set Dapur** - Kitchen design
2. **Kantor** - Office design
3. **Kamar Tidur** - Bedroom design
4. **Rumah** - House design

### Design Styles
1. **Modern Kontemporer** - Contemporary modern
2. **Modern Klasik** - Classic modern
3. **Minimalis** - Minimalist
4. **Industrial** - Industrial style
5. **Skandinavia** - Scandinavian style
6. **Rustic** - Rustic style

### Consultation Status
- `pending` - Menunggu konfirmasi
- `confirmed` - Dikonfirmasi
- `in_progress` - Sedang berlangsung
- `completed` - Selesai
- `cancelled` - Dibatalkan

## Testing

Test the API endpoints:

```bash
# Test consultation types
curl -X GET http://localhost:3000/api/consultations/types

# Test design categories
curl -X GET http://localhost:3000/api/consultations/design-categories

# Test design styles
curl -X GET http://localhost:3000/api/consultations/design-styles
```

## File Structure
```
backend/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   └── auth.js              # JWT authentication
├── routes/
│   ├── consultations.js     # Consultation endpoints
│   ├── services.js          # Service endpoints
│   └── auth.js              # Authentication endpoints
├── scripts/
│   ├── init-consultation-system.js  # Initialize consultation data
│   └── seed-services.js     # Seed services data
├── CONSULTATION_API.md      # Detailed API documentation
└── index.js                 # Main server file
```

## Integration with Frontend

Frontend dapat mengintegrasikan sistem ini dengan:

1. **Service Detail Page** - Menampilkan detail layanan
2. **Consultation Form** - Form penjadwalan konsultasi
3. **User Dashboard** - Menampilkan riwayat konsultasi
4. **Admin Panel** - Manajemen status konsultasi

## Security Features

- ✅ JWT Authentication
- ✅ Input validation
- ✅ SQL injection protection
- ✅ CORS enabled
- ✅ Error handling

## Next Steps

Untuk pengembangan selanjutnya:
1. Email notifications untuk konfirmasi konsultasi
2. Calendar integration
3. Payment integration
4. File upload untuk referensi desain
5. Real-time chat system
6. Admin dashboard untuk manajemen konsultasi

## Support

Untuk pertanyaan atau bantuan, silakan hubungi tim development.
