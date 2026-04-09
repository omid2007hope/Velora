# 🛒 Velora — Full-Stack E-Commerce Platform

A production-style full-stack e-commerce application built with a modern architecture:

- **Frontend:** Next.js (App Router), React, Tailwind, Redux
- **Backend:** Express, MongoDB (Mongoose), Zod, JWT, Stripe, Nodemailer

---

# 🧠 Architecture Overview

```
[ Client / Browser ]
↓
[ Next.js Frontend ]
↓ (API Requests)
[ Express Backend ]
↓
[ Services Layer ]
↓
[ MongoDB Database ]
```

---

# 📁 Project Structure

```
Velora/
│
├── Frontend/
├── Backend/
├── For_Ai_Read_Only/
├── Velora.postman_collection.json
├── .github/
└── License.md
```

---

# ⚛️ Frontend (Next.js)

### Core Structure

```
Frontend/src/app/
│
├── layout.js              # Global layout (HTML shell, providers)
├── page.jsx               # Home route
│
├── products/
│   ├── page.jsx           # Product catalog
│   └── [id]/page.jsx      # Product detail
│
├── category/[slug]/       # Category pages
├── account/               # User account pages
├── order/                 # Checkout flow
│
├── features/              # Feature-based architecture
│   ├── home/
│   ├── catalog/
│   ├── product/
│   ├── order/
│   ├── account/
│   └── auth/
│
├── components/            # Shared UI components
├── lib/                   # Utilities (SEO, config, helpers)
├── services/              # API helpers
├── redux/                 # Global state
└── assets/                # Static assets
```

---

## 🎯 Frontend Principles

- Thin route files
- Feature-based modular structure
- Reusable UI components
- Centralized API communication
- SEO-first rendering (App Router)

---

# 🔧 Backend (Express + MongoDB)

### Core Structure

```
Backend/
│
├── Server.js              # App entry point
│
├── routes/
│   └── versionOne/        # API versioning
│
├── controller/            # HTTP layer
├── services/              # Business logic
├── model/                 # Mongoose schemas
├── middleware/            # Auth, validation, errors
├── validation/            # Zod schemas
├── database/              # DB connection
├── config/                # Environment config
├── utils/                 # Helpers (Stripe, mail, etc.)
└── tests/                 # Integration tests
```

---

## 🔄 Backend Request Lifecycle

```
Client Request
↓
Route
↓
Middleware
↓
Controller
↓
Service
↓
Model (MongoDB)
↓
Response
```

---

## 📌 Example Flow

```
GET /products?category=Men

→ Route
→ ProductController.getProducts()
→ ProductService.fetchProducts()
→ ProductModel.find()
→ Return JSON
```

---

# 🔗 Data Flow (Frontend ↔ Backend)

```
Frontend (Next.js)
↓ fetch()
/api/v1/products
↓
Backend Controller
↓
Service Logic
↓
MongoDB
↓
Response → UI render
```

---

# 🧩 Key Features

- Full product catalog with filtering
- Dynamic product pages
- Authentication (JWT)
- Cart & checkout flow
- Stripe payment integration
- Email notifications (Nodemailer)
- SEO optimization (Next.js metadata + structured data)

---

# 🧱 Architectural Decisions

### Frontend

- Feature-first folder structure
- Server-side rendering where needed
- Shared service layer for API calls

### Backend

- Layered architecture:

```
Route → Controller → Service → Model
```

- Zod validation for request safety
- Middleware for cross-cutting concerns

---

# ⚠️ Engineering Rules

## Controllers

- Handle request/response only
- No business logic
- No database queries

## Services

- Contain all business logic
- Interact with models
- Return clean data

## Models

- Define schema only
- No logic

---

# 🚀 Future Improvements

- API versioning standardization (`/api/v1`)
- Advanced filtering (category + subcategory)
- Caching layer (Redis)
- Search optimization (Elastic / full-text)
- CI/CD pipeline

---

# 🧠 Mental Model

Think in pipelines, not pages:

```
User Action
↓
Frontend Intent
↓
API Call
↓
Backend Logic
↓
Database
↓
Response
↓
UI Update
```

---

# 📬 API Testing

Use:

```
Velora.postman_collection.json
```

to test endpoints manually.

---

# 📄 License

See `License.md`

---

# 👨‍💻 Author

**Omid Teimory**

- Full-Stack Developer
- Focus: scalable, production-ready applications
