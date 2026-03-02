# Better Velora Backend Plan

## Goal
Build a production-ready backend that replaces the current localStorage-only frontend behavior with real APIs for products, accounts, cart, checkout, orders, and reviews.

## Recommended Stack
- Runtime: Node.js (LTS)
- Framework: Express
- Database: MongoDB with Mongoose
- Cache/session: Redis (optional in Phase 1)
- Auth: JWT access + refresh tokens, bcrypt for passwords
- Payments: Stripe (Payment Intents)
- Email: SendGrid or AWS SES
- File storage: S3 or Cloudinary for product images
- Validation: Zod or Joi
- Logging: pino
- Testing: Jest + Supertest

## Backend Folder Layout
This matches the existing `backend/` structure and `BaseService.js`:
- `backend/model/` Mongoose schemas
- `backend/service/` business logic classes (extend `BaseService`)
- `backend/controller/` request handlers
- `backend/router/` Express routers
- `backend/middleware/` auth, validation, error handling
- `backend/api/` API version entrypoints

## Data Models (Phase 1)
User
- `_id`, `fullName`, `email`, `passwordHash`, `phoneNumber`, `dateOfBirth`, `gender`, `avatarUrl`, `provider`, `createdAt`, `updatedAt`

Address
- `_id`, `userId`, `street`, `city`, `country`, `postal`, `isDefault`, `createdAt`, `updatedAt`

Product
- `_id`, `name`, `description`, `category`, `price`, `compareAtPrice`, `discountLabel`, `images`, `isNewArrival`, `variants`, `inventory`, `createdAt`, `updatedAt`

ProductVariant
- `color`, `size`, `sku`, `inventory`

Review
- `_id`, `productId`, `userId` (nullable for guest), `name`, `rating`, `comment`, `createdAt`

Cart
- `_id`, `userId` or `sessionId`, `items`, `updatedAt`

CartItem
- `productId`, `variant`, `quantity`, `priceSnapshot`

Order
- `_id`, `userId` or `guestEmail`, `items`, `subtotal`, `shipping`, `tax`, `total`, `addressSnapshot`, `paymentStatus`, `orderStatus`, `createdAt`

PaymentIntent
- `_id`, `orderId`, `provider`, `providerIntentId`, `status`, `amount`, `currency`, `createdAt`

## API Endpoints (Phase 1)
Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/google`

Users
- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`

Addresses
- `GET /api/v1/addresses`
- `POST /api/v1/addresses`
- `PATCH /api/v1/addresses/:id`
- `DELETE /api/v1/addresses/:id`

Products
- `GET /api/v1/products`
- `GET /api/v1/products/:id`

Categories
- `GET /api/v1/categories`

Reviews
- `GET /api/v1/products/:id/reviews`
- `POST /api/v1/products/:id/reviews`

Cart
- `GET /api/v1/cart`
- `POST /api/v1/cart/items`
- `PATCH /api/v1/cart/items/:itemId`
- `DELETE /api/v1/cart/items/:itemId`
- `DELETE /api/v1/cart`

Checkout and Orders
- `POST /api/v1/checkout/create`
- `POST /api/v1/checkout/confirm`
- `GET /api/v1/orders`
- `GET /api/v1/orders/:id`

Payments
- `POST /api/v1/payments/webhook`

## API Behavior Mapped to the Frontend
Products
- Replace `frontend/utils/Products.js` with `GET /api/v1/products` and `GET /api/v1/products/:id`.
- Support `?category=Men|Women|Accessories|Watch` and `?new=true`.
- Response should include `oldPrice`, `newPrice`, `discount`, `category`, `NewArrivals`, and `image` to keep UI stable.

Reviews
- Replace the local `reviews` state in `ProductPreviewPage.jsx` with `GET /api/v1/products/:id/reviews` and `POST /api/v1/products/:id/reviews`.

Cart
- Replace localStorage basket with `GET /api/v1/cart` and cart item mutation routes.
- Cart items must include `selectedColor`, `selectedSize`, `quantity`, and a price snapshot.

Checkout
- Replace the localStorage payment/address in `CheckoutForm.jsx` with saved user profile and address endpoints.
- Do not store raw card data in the backend. Use Stripe Payment Intents and store only provider IDs.

Auth
- Replace `savedUser` and `user` localStorage flow with JWT-based auth.
- Keep a compatible `fullName`, `email`, `phoneNumber`, `dateOfBirth`, `gender` profile.

## Checkout Flow (Phase 1)
1. Frontend builds cart with `POST /api/v1/cart/items`.
2. User proceeds to checkout and submits address and email.
3. Backend creates an Order and Stripe Payment Intent with `POST /api/v1/checkout/create`.
4. Frontend confirms payment with Stripe.js, then calls `POST /api/v1/checkout/confirm`.
5. Backend marks order as paid, empties cart, sends confirmation email.

## Seed Data
Use the current product list in `frontend/utils/Products.js` to seed MongoDB in a one-time script.

## Environment Variables
- `PORT=4000`
- `MONGO_URL=...`
- `JWT_SECRET=...`
- `JWT_REFRESH_SECRET=...`
- `STRIPE_SECRET_KEY=...`
- `STRIPE_WEBHOOK_SECRET=...`
- `EMAIL_PROVIDER_API_KEY=...`
- `CLIENT_URL=http://localhost:5173`

## Phase 2 Enhancements
- Admin dashboard CRUD for products, categories, orders, reviews
- Inventory reservations and stock checks per variant
- Coupons, promotions, free shipping thresholds
- Wishlist and recently viewed
- Order tracking and shipment notifications
- Rate limiting and audit logs

## Notes
- Payment fields in `CheckoutForm.jsx` should be replaced by Stripe Elements or an equivalent tokenized flow.
- Review moderation can be added via a `status` field and admin routes.
- Consider storing images in S3 or Cloudinary and only keeping URLs in MongoDB.
