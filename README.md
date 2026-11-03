# 🚗 JantaGaraj — On-Demand Automotive & Home Care Marketplace

<div align="center">

![JantaGaraj Banner](https://img.shields.io/badge/JantaGaraj-Auto%20%26%20Home%20Services-FF771C?style=for-the-badge&logo=wrench&logoColor=white)
[![Vercel](https://img.shields.io/badge/Deployed%20with-Vercel-black?style=for-the-badge&logo=vercel)](https://janatha-garage-o4y9.vercel.app/)
[![Render](https://img.shields.io/badge/Hosted%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://janathagarage-2puu.onrender.com)
[![Swagger](https://img.shields.io/badge/API%20Docs-Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)](https://janathagarage-2puu.onrender.com/docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br />

**A modern, production-grade on-demand marketplace connecting vehicle owners and households with verified mechanics, electricians, and technicians in real-time.**

[Live Demo](https://janatha-garage-o4y9.vercel.app/) • [Interactive API Docs](https://janathagarage-2puu.onrender.com/docs) • [Report Bug](https://github.com/Parinay-Chauhan/JanathaGarage/issues) • [Request Feature](https://github.com/Parinay-Chauhan/JanathaGarage/issues)

</div>

---

## 📌 Overview

**JantaGaraj** is a full-stack, production-ready on-demand service marketplace designed to solve emergency roadside vehicle breakdowns and domestic maintenance bottlenecks.

In most Indian cities and highways, finding a dependable mechanic or electrician during emergencies is stressful due to arbitrary pricing, long waiting times, and unverified credentials. JantaGaraj bridges this gap with:

- **Transparent Pricing:** Fixed rate cards with zero hidden charges.
- **Rapid Response:** 30-minute target doorstep arrival via geolocation triage.
- **Verified Professionals:** Mandatory KYC verification (Aadhaar / Driving License / PAN).
- **Inclusive Accessibility:** Fully localized bilingual interface supporting both English and Hindi.

---

## ⚡ Key Features

### 🛠️ 1. Instant Service Catalog & Breakdown Assistance
- **Comprehensive Trade Blueprint:** Covers vehicle breakdown triage (puncture, battery jumpstart, lube), AC repair & deep foam jet cleaning, plumbing, home electrical rewiring, and appliance care.
- **Upfront Transparent Pricing:** Fixed starting rates and estimated service durations displayed upfront for every service card.
- **High-Performance Search:** Debounced instant search query filter allowing users to quickly find required diagnostics.

### 📍 2. Smart GPS Geolocation & Real-Time Triage
- **Browser GPS Integration:** One-click automated user latitude and longitude resolution.
- **Manual City Selector:** Support for quick area switching across major metropolitan hubs (Delhi NCR, Mumbai, Bengaluru, etc.).
- **Technician Proximity Match:** Filters verified technicians within an adjustable operational radius (`serviceRadiusKm`).

### 🔄 3. State-Machine Driven Booking Lifecycle
- **Deterministic Booking Progress:** Strict state transitions tracking every phase:
  $$\text{PENDING} \longrightarrow \text{ACCEPTED} \longrightarrow \text{EN\_ROUTE} \longrightarrow \text{ARRIVED} \longrightarrow \text{IN\_PROGRESS} \longrightarrow \text{COMPLETED}$$
- **Real-Time Job Actions:** Instant status updates accessible to customers, technicians, and administrators.

### 👨‍🔧 4. Technician Radar & KYC Verification Desk
- **Live Availability Switch:** Technicians can toggle `isOnline` and `isAvailable` directly from their dashboard.
- **Audit-Grade Verification Pipeline:** Four-stage KYC verification status (`NOT_SUBMITTED`, `SUBMITTED`, `UNDER_REVIEW`, `VERIFIED`, `REJECTED`).
- **Admin Review Desk:** Dedicated endpoints for platform administrators to inspect identity proofs and approve verified mechanics.

### 🌐 5. Dual-Language Localization (English & Hindi)
- **Seamless Language Switch:** Zero-reload live toggle between **English** and **Hindi (हिंदी)** powered by `LanguageContext`.
- **Localized Technical Terms:** Complete Hindi translations for trade categories, service titles, emergency disclaimers, and reviews.

### 🔐 6. Production Authentication & Security
- **Dual-Token Architecture:**
  - `accessToken` for fast stateless authorization.
  - `refreshToken` stored securely in HTTP-only cookies.
- **Cross-Origin Security:** Configured with `SameSite: None` and `Secure: true` cookie policies for decoupled frontend (Vercel) and backend (Render) hosting.
- **Dynamic CORS Origin Reflection:** Automatically allows Vercel preview URLs, production domains, and local development environments.

### ⏱️ 7. 24/7 Keep-Alive & Health Monitoring
- **Zero Cold Starts:** Dedicated lightweight health check routes (`/`, `/health`, `/ping`) built for UptimeRobot monitoring.
- **Prisma Connection Safety:** Lightweight ping endpoints prevent database connection pooling exhaustion while keeping the free-tier Render container active.

---

## 🛠️ Tech Stack

### Frontend (`client/`)

| Technology | Description |
| :--- | :--- |
| **React 18** | Modern component-driven UI architecture |
| **TypeScript** | Type-safe, self-documenting frontend codebase |
| **Vite 5** | Next-generation ultra-fast frontend build tooling |
| **Tailwind CSS 3** | Utility-first responsive styling with dark luxury theme |
| **Redux Toolkit (RTK Query)** | Centralized state management with smart query caching |
| **GSAP 3** | Professional entrance animations and micro-interactions |
| **React Hook Form + Zod** | Schema-driven form validation and error handling |
| **Lucide React** | Clean, minimalist SVG icons |

<br />

### Backend (`server/`)

| Technology | Description |
| :--- | :--- |
| **Node.js (ESM)** | Modern ECMAScript module runtime |
| **Express 5** | High-performance REST API routing framework |
| **Prisma ORM 5** | Type-safe database queries and automated migrations |
| **PostgreSQL (Supabase)** | Cloud relational database with connection pooling |
| **JWT & Bcrypt** | Secure password hashing and token lifecycle management |
| **Swagger UI Express** | OpenAPI interactive documentation served at `/docs` |
| **Cookie-Parser & CORS** | Cross-site credential handling and security headers |

<br />

### Cloud & DevOps

| Service | Description |
| :--- | :--- |
| **Vercel** | Edge network deployment for the client application |
| **Render** | Managed container cloud for the Express backend |
| **Supabase** | Cloud PostgreSQL with PgBouncer session & transaction poolers |
| **UptimeRobot** | 24/7 HTTP keep-alive monitoring to eliminate instance sleep |

---

## 📁 Repository Structure

```plaintext
JantaGaraj/
├── client/                     # Frontend React + Vite application
│   ├── public/                 # Static assets, hero banners, and icons
│   │   └── images/             # Visual images and brand assets
│   ├── src/
│   │   ├── api/                # Base API instance & Axios/fetch setup
│   │   ├── components/         # Reusable UI widgets (Navbar, Cards, Badges)
│   │   ├── context/            # LanguageContext (EN/HI) & LocationContext
│   │   ├── features/           # RTK Query slices (auth, bookings, services, technicians)
│   │   ├── lib/                # GSAP animation timeline utilities
│   │   ├── locales/            # Translation dictionaries (English & Hindi)
│   │   ├── pages/              # LandingPage, ServicesPage, TechniciansPage
│   │   └── types/              # TypeScript contracts and API schemas
│   ├── package.json
│   ├── vercel.json             # Vercel SPA routing fallback configuration
│   └── vite.config.ts
│
├── server/                     # Backend Node.js + Express API
│   ├── prisma/
│   │   └── schema.prisma       # Prisma data models (Users, Bookings, Technicians)
│   ├── src/
│   │   ├── controllers/        # Business logic controllers
│   │   ├── db/                 # Prisma client instance & DB connection
│   │   ├── middleware/         # JWT auth verification & global ErrorHandler
│   │   ├── routes/             # RESTful API route declarations
│   │   │   ├── healthcheck.routes.js # UptimeRobot & health endpoints
│   │   │   └── ...
│   │   ├── utils/              # ApiResponse, ApiError, AsyncHandler, Swagger
│   │   ├── app.js              # Express app setup and dynamic CORS configuration
│   │   └── index.js            # Server entry point
│   └── package.json
│
├── LICENSE                     # MIT License
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)
- **PostgreSQL** instance (Local or free cloud database on [Supabase](https://supabase.com/))

---

### 1. Clone the Repository

```bash
git clone https://github.com/Parinay-Chauhan/JanathaGarage.git
cd JanathaGarage
```

---

### 2. Configure Backend (`server/`)

Open a terminal window and set up the backend service:

1. **Navigate to the server directory and install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create a `.env` file in `server/.env`:**
   ```env
   PORT=8000
   NODE_ENV=development

   # PostgreSQL Connection (Supabase Transaction & Session Pooler)
   POSTGRES_URI="postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

   # Authentication Secrets
   ACCESS_TOKEN_SECRET="your_super_secret_access_token_key_here_32_chars"
   ACCESS_TOKEN_EXPIRY="1d"
   REFRESH_TOKEN_SECRET="your_super_secret_refresh_token_key_here_32_chars"
   REFRESH_TOKEN_EXPIRY="10d"

   # CORS Allowed Origin
   CORS_ORIGIN="http://localhost:5173"
   ```

3. **Generate Prisma Client and push database schema:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the backend development server:**
   ```bash
   npm run dev
   ```

   *The backend will be available at `http://localhost:8000` with Swagger Docs at `http://localhost:8000/docs`.*

---

### 3. Configure Frontend (`client/`)

Open a **new separate terminal window** and set up the client application:

1. **Navigate to the client directory and install dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Create a `.env` file in `client/.env`:**
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

3. **Launch the Vite development server:**
   ```bash
   npm run dev
   ```

   *The client web application will open at `http://localhost:5173`.*

---

## 📡 REST API Reference

Interactive API documentation is generated via Swagger and can be tested live in your browser:

- **Local Swagger UI:** `http://localhost:8000/docs`
- **Production Swagger UI:** [https://janathagarage-2puu.onrender.com/docs](https://janathagarage-2puu.onrender.com/docs)

<br />

### 🏥 Health Check (`/health`, `/api/v1/health`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Root keep-alive ping for uptime monitors | ❌ No |
| `GET` | `/health` | Lightweight status & uptime check | ❌ No |
| `GET` | `/ping` | Fast plain text ping endpoint | ❌ No |
| `GET` | `/api/v1/health` | Comprehensive telemetry (uptime, environment) | ❌ No |

<br />

### 🔐 Authentication & Users (`/api/v1/users`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/users/register` | Register a new user (`CUSTOMER` or `TECHNICIAN`) | ❌ No |
| `POST` | `/api/v1/users/login` | Authenticate user and issue tokens in secure cookies | ❌ No |
| `POST` | `/api/v1/users/logout` | Invalidate session and clear auth cookies | ✅ Yes |
| `GET` | `/api/v1/users/me` | Fetch profile information of logged-in user | ✅ Yes |

<br />

### 🛠️ Services & Categories (`/api/v1/services`, `/api/v1/categories`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/categories` | Retrieve all service categories (Automotive, Electrical, etc.) | ❌ No |
| `GET` | `/api/v1/services` | Retrieve list of active services with pricing | ❌ No |
| `GET` | `/api/v1/services/:id` | Fetch specific service details | ❌ No |

<br />

### 👨‍🔧 Technicians (`/api/v1/technicians`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/technicians` | Search & filter verified technicians by location & specialty | ❌ No |
| `GET` | `/api/v1/technicians/:id` | Get individual technician rating, bio, and experience | ❌ No |
| `PATCH` | `/api/v1/technicians/status` | Toggle technician online/available status | ✅ Technician |

<br />

### 📋 Bookings (`/api/v1/bookings`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/bookings` | Create new doorstep service booking | ✅ Customer |
| `GET` | `/api/v1/bookings/my` | Retrieve booking history for authenticated user | ✅ Yes |
| `PATCH` | `/api/v1/bookings/:id/status` | Update booking status (`ACCEPTED` ➔ `COMPLETED`) | ✅ Technician / Admin |

<br />

### 🛡️ Admin Desk (`/api/v1/admin`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/admin/kyc-pending` | Review pending technician KYC requests | 🛡️ Admin |
| `PATCH` | `/api/v1/admin/kyc/:id/verify` | Approve or reject technician identity verification | 🛡️ Admin |

---

## 🎯 Usage Workflow

### 1. For Customers
1. Open the landing page and browse automotive and home care services.
2. Filter by category (Mechanic, Electrician, Plumber, AC Repair).
3. Detect your location via **GPS** or select your city manually to locate nearby technicians.
4. Book a service with upfront pricing and track the technician's arrival status in real-time.

### 2. For Technicians
1. Register as a technician and submit your KYC documents (Aadhaar / Driving License).
2. Once verified by Admin, toggle **Online / Available** mode on the dashboard to receive requests.
3. Accept incoming booking requests and update status from `Accepted` ➔ `Arrived` ➔ `Completed`.

### 3. For Administrators
1. Access the Admin Desk to inspect pending technician KYC applications.
2. Approve or reject technician verification requests with audit reasons.
3. Monitor platform-wide bookings, service listings, and user reviews.

---

## 🚢 Production Deployment

### Backend (Render)
1. Create a **New Web Service** connected to the repository (`main` branch).
2. Set **Root Directory** to `server`.
3. Set **Build Command** to:
   ```bash
   npm install && npx prisma generate
   ```
4. Set **Start Command** to:
   ```bash
   npm start
   ```
5. Add all environment variables from `server/.env` with `NODE_ENV=production`.

### Frontend (Vercel)
1. Import the repository on **Vercel**.
2. Set **Root Directory** to `client`.
3. Framework Preset: **Vite**.
4. Build Command: `vite build` (Output Directory: `dist`).
5. Add Environment Variable:
   - `VITE_API_URL` = `https://janathagarage-2puu.onrender.com/api/v1`
6. Deploy.

---

## 👨‍💻 Author

**Parinay Chauhan**
- GitHub: [@Parinay-Chauhan](https://github.com/Parinay-Chauhan)
- Project Repository: [JanathaGarage](https://github.com/Parinay-Chauhan/JanathaGarage)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
