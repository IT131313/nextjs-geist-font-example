# Order Management & Product Rating API Documentation

This document describes the new API endpoints for order management and product rating functionality.

## Order Management Endpoints

### 1. Get Order History
**GET** `/api/orders`

Get all orders for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "total_amount": 150000,
    "status": "completed",
    "created_at": "2024-01-15T10:30:00Z",
    "item_count": 2
  }
]
```

### 2. Get Order Details
**GET** `/api/orders/:id`

Get detailed information about a specific order.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "total_amount": 150000,
  "status": "completed",
  "created_at": "2024-01-15T10:30:00Z",
  "username": "john_doe",
  "email": "john@example.com",
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "price_at_time": 50000,
      "product_id": 1,
      "product_name": "Philips Strip Lamp",
      "image_url": "https://example.com/image.jpg",
      "category": "lighting",
      "subtotal": 100000
    }
  ]
}
```

### 3. Cancel Order
**PATCH** `/api/orders/:id/cancel`

Cancel a pending order and restore product stock.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Order cancelled successfully",
  "orderId": "1"
}
```

**Notes:**
- Only orders with status 'pending' or 'confirmed' can be cancelled
- Product stock will be restored automatically
- Sold count will be decremented

### 4. Update Order Status
**PATCH** `/api/orders/:id/status`

Update order status (for admin use or order tracking).

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "status": "shipped"
}
```

**Valid Statuses:**
- `pending` - Order placed, awaiting confirmation
- `confirmed` - Order confirmed by seller
- `processing` - Order being prepared
- `shipped` - Order shipped to customer
- `completed` - Order delivered and completed
- `cancelled` - Order cancelled

## Product Rating Endpoints

### 1. Add Product Rating
**POST** `/api/products/:id/rating`

Add a rating and review for a purchased product.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "rating": 5,
  "review": "Excellent product, very satisfied!",
  "orderId": 1
}
```

**Response:**
```json
{
  "message": "Rating added successfully",
  "rating": 5,
  "review": "Excellent product, very satisfied!"
}
```

**Validation Rules:**
- Rating must be between 1-5
- User must have purchased the product in a completed order
- User can only rate each product once per order
- Order ID is required to verify purchase

### 2. Get Product Ratings
**GET** `/api/products/:id/ratings`

Get all ratings and reviews for a specific product.

**Response:**
```json
{
  "ratings": [
    {
      "rating": 5,
      "review": "Excellent product!",
      "created_at": "2024-01-16T14:30:00Z",
      "username": "john_doe"
    }
  ],
  "summary": {
    "average_rating": 4.5,
    "total_ratings": 10,
    "distribution": {
      "5": 6,
      "4": 3,
      "3": 1,
      "2": 0,
      "1": 0
    }
  }
}
```

### 3. Get User's Rateable Products
**GET** `/api/products/user/rateable`

Get all products that the user has purchased and can rate.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Philips Strip Lamp",
    "image_url": "https://example.com/image.jpg",
    "order_id": 1,
    "order_date": "2024-01-15T10:30:00Z",
    "already_rated": 0
  }
]
```

## Database Schema Updates

### New Table: product_ratings
```sql
CREATE TABLE product_ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  UNIQUE(user_id, product_id, order_id)
);
```

### Updated Products Table
The products table now includes:
- `rating` REAL DEFAULT 0 - Average rating
- `rating_count` INTEGER DEFAULT 0 - Total number of ratings

## Error Handling

### Common Error Responses

**401 Unauthorized:**
```json
{
  "error": "Access denied. No token provided."
}
```

**403 Forbidden:**
```json
{
  "error": "You can only rate products you have purchased and received"
}
```

**404 Not Found:**
```json
{
  "error": "Order not found"
}
```

**400 Bad Request:**
```json
{
  "error": "Rating must be between 1 and 5"
}
```

## Usage Examples

### Complete Order Flow with Rating

1. **Place Order** (existing functionality)
   ```
   POST /api/cart/checkout
   ```

2. **Check Order Status**
   ```
   GET /api/orders/1
   ```

3. **When Order is Completed, Rate Product**
   ```
   POST /api/products/1/rating
   {
     "rating": 5,
     "review": "Great product!",
     "orderId": 1
   }
   ```

4. **View Product Ratings**
   ```
   GET /api/products/1/ratings
   ```

### Order Management Flow

1. **View Order History**
   ```
   GET /api/orders
   ```

2. **Get Order Details**
   ```
   GET /api/orders/1
   ```

3. **Cancel Order (if needed)**
   ```
   PATCH /api/orders/1/cancel
   ```

## Security Features

- All endpoints require authentication via JWT token
- Users can only access their own orders
- Users can only rate products they have actually purchased
- Duplicate ratings for the same product/order combination are prevented
- Order cancellation automatically restores product inventory
