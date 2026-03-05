# i-Study (Frontend + Backend)

Full-stack course platform with user auth, courses, cart, wishlist, checkout/orders, and admin panel CRUD.

## Quick Start (5 Commands)

```bash
npm install
npm install --prefix Backend
npm install --prefix Fronted
npm run dev --prefix Backend
npm run dev --prefix Fronted
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## Project Structure

- `Backend/` -> Node.js + Express + MongoDB API
- `Fronted/` -> React + Vite client app
- `Backend/postman/i-study-backend.postman_collection.json` -> Postman collection

## Tech Stack

- Backend: Express, Mongoose, JWT, Cookie Parser, CORS, Multer
- Frontend: React, Vite, React Router, Axios, Bootstrap
- Database: MongoDB

## Prerequisites

- Node.js 18+
- npm
- MongoDB (local or cloud)

## Environment Variables

### Backend (`Backend/.env`)

Create `Backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/i_study
JWT_SECRET=your_strong_secret
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (`Fronted/.env`)

Create `Fronted/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Install Dependencies

From repository root:

```bash
npm install
npm install --prefix Backend
npm install --prefix Fronted
```

## Run Project

### 1) Start backend

```bash
npm run dev --prefix Backend
```

Backend runs on: `http://localhost:5000`

### 2) Start frontend

```bash
npm run dev --prefix Fronted
```

Frontend runs on: `http://localhost:5173`

## Build

Frontend production build:

```bash
npm run build
```

## Lint

Frontend lint:

```bash
npm run lint
```

## Root Scripts

At repo root (`package.json`):

- `npm run dev` -> runs frontend dev
- `npm run build` -> builds frontend
- `npm run lint` -> lints frontend

## Backend Scripts

Inside `Backend/package.json`:

- `npm run start` -> start server
- `npm run dev` -> start with nodemon

## API Overview

Base URL: `http://localhost:5000`

### Public

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/content/home`
- `GET /api/courses`
- `GET /api/courses/:id`
- `GET /uploads/*`

### Auth Required

- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/cart`
- `POST /api/cart`
- `PATCH /api/cart/:courseId`
- `DELETE /api/cart/:courseId`
- `DELETE /api/cart`
- `GET /api/wishlist`
- `POST /api/wishlist`
- `DELETE /api/wishlist/:courseId`
- `POST /api/orders/checkout`
- `GET /api/orders`
- `GET /api/orders/:id`

### Admin Required

- `POST /api/courses`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`
- `GET /api/admin/users`
- `POST /api/admin/users`
- `GET /api/admin/users/:id`
- `PUT /api/admin/users/:id`
- `DELETE /api/admin/users/:id`
- `GET /api/admin/orders`
- `PATCH /api/admin/orders/:id/status`
- `GET /api/admin/courses`

## Postman Collection

Import:

- `Backend/postman/i-study-backend.postman_collection.json`

It includes all routes and variables (`baseUrl`, `token`, `courseId`, `orderId`, `userId`).

## Notes

- Course image uploads are stored in `Backend/uploads/courses`.
- Authentication supports cookie-based sessions and Bearer token.
- If no admin exists yet, first successful login is auto-promoted to admin (bootstrap behavior).
