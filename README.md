# 🚗 JantaGaraj (जनता गैराज)

> **On-Demand Automotive & Home Care Marketplace Platform**  
> Connecting vehicle owners and households with verified local mechanics, electricians, and technicians in real-time.

<br />

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://janatha-garage-o4y9.vercel.app/)
[![API Status](https://img.shields.io/badge/API_Status-Online-46E3B7?style=for-the-badge&logo=render)](https://janathagarage-2puu.onrender.com/health)
[![Swagger Docs](https://img.shields.io/badge/Swagger-Docs-85EA2D?style=for-the-badge&logo=swagger)](https://janathagarage-2puu.onrender.com/docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](./LICENSE)

<br />

---

## 📖 Overview

**JantaGaraj** is a full-stack, production-ready on-demand service marketplace designed to solve sudden vehicle breakdowns and domestic maintenance issues.

In most Indian cities and highways, finding a dependable mechanic or electrician during emergencies is stressful due to arbitrary pricing, long waiting times, and unverified credentials. JantaGaraj bridges this gap by offering:

- **Transparent Pricing:** Fixed rate cards with zero hidden charges.
- **Rapid Response:** 30-minute target doorstep arrival via geolocation triage.
- **Verified Professionals:** Mandatory KYC verification (Aadhaar / Driving License / PAN).
- **Inclusive Accessibility:** Fully localized bilingual interface supporting both English and Hindi.

<br />

---

## ✨ Features

- **⚡ Rapid Doorstep Assistance:** Immediate technician dispatch for vehicle breakdowns, battery jumpstarts, and home electrical or plumbing faults.
- **📍 Smart Geolocation & City Search:** Auto-detects user coordinates via browser GPS or allows manual city/area selection.
- **🔄 Deterministic Booking Lifecycle:** State-machine tracking every stage:
  $$\text{PENDING} \longrightarrow \text{ACCEPTED} \longrightarrow \text{EN\_ROUTE} \longrightarrow \text{ARRIVED} \longrightarrow \text{IN\_PROGRESS} \longrightarrow \text{COMPLETED}$$
- **👨‍🔧 Technician Radar & KYC System:** Technicians manage live availability (`isOnline`, `isAvailable`), service radius, and upload identity proofs for review.
- **🛡️ Role-Based Access Control:** Distinct roles and portals for `CUSTOMER`, `TECHNICIAN`, and `ADMIN`.
- **🇮🇳 Bilingual Localization:** Real-time toggle between **English** and **Hindi (हिंदी)** across the entire catalog and UI.
- **📖 Interactive Swagger Documentation:** Live OpenAPI interactive documentation available at `/docs`.
- **⏱️ 24/7 Keep-Alive Health Monitoring:** Dedicated endpoints (`/`, `/health`, `/ping`) configured for UptimeRobot to eliminate cold starts.

<br />

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI component architecture |
| **TypeScript** | Type safety and reliable contracts |
| **Vite 5** | High-speed frontend tooling and bundler |
| **Tailwind CSS 3** | Responsive utility-first styling |
| **Redux Toolkit (RTK Query)** | Global state management and API caching |
| **GSAP 3** | Smooth landing animations and micro-interactions |
| **React Hook Form + Zod** | Form validation and schema checks |
| **Lucide React** | Modern minimalist icon library |

<br />

### Backend

| Technology | Purpose |
| :--- | :--- |
| **Node.js (ES Modules)** | JavaScript server runtime |
| **Express 5** | RESTful routing and middleware engine |
| **Prisma ORM 5** | Next-generation database ORM and type generation |
| **PostgreSQL (Supabase)** | Cloud relational database with connection pooling |
| **JWT + HTTP-Only Cookies** | Secure stateless authentication with dual tokens |
| **Swagger UI Express** | Interactive OpenAPI documentation |
| **Bcrypt** | Strong password hashing |

<br />

### Infrastructure & Deployment

- **Frontend:** [Vercel](https://janatha-garage-o4y9.vercel.app/)
- **Backend:** [Render](https://janathagarage-2puu.onrender.com)
- **Database:** [Supabase](https://supabase.com/)
- **Uptime Monitoring:** [UptimeRobot](https://uptimerobot.com/)

<br />

---

## 📸 Screenshots

| Hero & Service Discovery | Live Technician Network |
| :---: | :---: |
| <img src="client/public/images/hero_technician.jpg" alt="JantaGaraj Hero" width="460" /> | <img src="client/public/images/hero_technician_compressed.jpg" alt="Technician Network" width="460" /> |
| *Doorstep auto & appliance service booking* | *KYC-verified mechanics and technicians* |

<br />

---

## 📁 Folder Structure

```text
JantaGaraj/
│
├── client/                     # Frontend Application (React + Vite + TypeScript)
│   ├── public/                 # Static assets, icons, and hero visuals
│   │   └── images/             # Visual images and brand assets
│   ├── src/
│   │   ├── api/                # Base API and HTTP client configuration
│   │   ├── components/         # Reusable UI primitives, headers, and modals
│   │   ├── context/            # Language (EN/HI) and Location providers
│   │   ├── features/           # RTK Query slices (auth, bookings, services, technicians)
│   │   ├── lib/                # GSAP animation utilities
│   │   ├── locales/            # English and Hindi translation dictionaries
│   │   ├── pages/              # LandingPage, ServicesPage, TechniciansPage
│   │   └── types/              # TypeScript contracts and API schemas
│   ├── package.json
│   ├── vercel.json             # Vercel deployment configuration & SPA rewrites
│   └── vite.config.ts
│
├── server/                     # Backend Application (Node.js + Express + Prisma)
│   ├── prisma/
│   │   └── schema.prisma       # PostgreSQL schema models & enums
│   ├── src/
│   │   ├── controllers/        # Request handlers and business logic
│   │   ├── db/                 # Prisma client instance & DB connector
│   │   ├── middleware/         # Auth, Error handling, and validation middlewares
│   │   ├── routes/             # REST endpoints (auth, bookings, services, health)
│   │   ├── utils/              # ApiResponse, ApiError, AsyncHandler, Swagger
│   │   ├── app.js              # Express app setup, CORS, and route registration
│   │   └── index.js            # Server entry point
│   └── package.json
│
├── LICENSE                     # MIT License
└── README.md                   # Project documentation
```

<br />

---

## 💻 Installation

Follow these steps to run both the **Backend** and **Frontend** services on your local development machine.

<br />

### Prerequisites

Ensure you have the following installed:

- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **PostgreSQL**: A local instance or a free cloud database like [Supabase](https://supabase.com/)

<br />

### 1. Clone the Repository

```bash
git clone https://github.com/Parinay-Chauhan/JanathaGarage.git

cd JanathaGarage
```

<br />

---

### 2. Backend Setup & Run

Open a terminal window and follow these steps to configure and run the backend server:

<br />

**Step 2.1: Navigate to server directory**

```bash
cd server
```

<br />

**Step 2.2: Install backend dependencies**

```bash
npm install
```

<br />

**Step 2.3: Configure environment variables**

Create a `.env` file inside the `server/` folder:

```bash
cp .env.example .env
```

*(Edit `.env` and fill in your PostgreSQL URI and JWT secrets. See the [Environment Variables](#-environment-variables) section below).*

<br />

**Step 2.4: Sync database schema with Prisma**

```bash
npx prisma generate

npx prisma db push
```

<br />

**Step 2.5: Start the backend development server**

```bash
npm run dev
```

<br />

The backend will start on:

- **Server URL:** `http://localhost:8000`
- **Swagger Docs:** `http://localhost:8000/docs`
- **Health Check:** `http://localhost:8000/health`

<br />

---

### 3. Frontend Setup & Run

Open a **separate terminal window** and follow these steps to run the client web application:

<br />

**Step 3.1: Navigate to client directory**

```bash
cd client
```

<br />

**Step 3.2: Install frontend dependencies**

```bash
npm install
```

<br />

**Step 3.3: Configure environment variables**

Create a `.env` file inside the `client/` folder:

```bash
cp .env.example .env
```

Set the backend API endpoint:

```ini
VITE_API_URL=http://localhost:8000/api/v1
```

<br />

**Step 3.4: Start the Vite frontend server**

```bash
npm run dev
```

<br />

The frontend will start on:

- **Client Web App:** `http://localhost:5173`

<br />

---

## 🔐 Environment Variables

### Backend (`server/.env`)

```ini
PORT=8000
NODE_ENV=development

# PostgreSQL Connection (Supabase Transaction & Session pooler)
POSTGRES_URI="postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Authentication Secrets
ACCESS_TOKEN_SECRET="your_jwt_access_token_secret_min_32_characters"
ACCESS_TOKEN_EXPIRY="1d"
REFRESH_TOKEN_SECRET="your_jwt_refresh_token_secret_min_32_characters"
REFRESH_TOKEN_EXPIRY="10d"

# CORS Allowed Origin
CORS_ORIGIN="http://localhost:5173"
```

<br />

### Frontend (`client/.env`)

```ini
# Backend API Base URL
VITE_API_URL="http://localhost:8000/api/v1"

# Firebase Client Credentials (Optional)
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_firebase_project_id"
```

<br />

---

## 📡 API Documentation

Interactive API documentation is generated via Swagger and can be accessed directly in your browser:

- **Local Docs:** `http://localhost:8000/docs`
- **Live Production Docs:** [https://janathagarage-2puu.onrender.com/docs](https://janathagarage-2puu.onrender.com/docs)

<br />

### Key Endpoints Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Root keep-alive ping | ❌ Public |
| `GET` | `/health` | UptimeRobot health check | ❌ Public |
| `GET` | `/docs` | Interactive Swagger UI | ❌ Public |
| `POST` | `/api/v1/users/register` | Register new user account | ❌ Public |
| `POST` | `/api/v1/users/login` | Authenticate and issue HTTP cookies | ❌ Public |
| `POST` | `/api/v1/users/logout` | Clear authentication session | ✅ Authenticated |
| `GET` | `/api/v1/services` | Retrieve list of repair services | ❌ Public |
| `GET` | `/api/v1/categories` | Retrieve trade categories | ❌ Public |
| `GET` | `/api/v1/technicians` | Search verified mechanics | ❌ Public |
| `POST` | `/api/v1/bookings` | Create new doorstep service booking | ✅ Customer |
| `PATCH`| `/api/v1/bookings/:id/status` | Update booking status lifecycle | ✅ Technician / Admin |
| `GET` | `/api/v1/admin/kyc-pending` | Review pending technician KYC requests | 🛡️ Admin |

<br />

---

## 🎯 Usage

1. **For Customers:**
   - Browse automotive and home care services on the landing page or services catalog.
   - Filter by trade category (Mechanic, Electrician, Plumber, AC Repair).
   - Enter your location or click **GPS** to find nearby certified technicians.
   - Book a service with upfront pricing and track the technician's arrival status.

2. **For Technicians:**
   - Register a technician profile and submit KYC verification documents.
   - Toggle availability status (`Online` / `Offline`) to receive booking notifications.
   - Update job progress from `Accepted` to `Completed`.

3. **For Administrators:**
   - Access the admin desk to review and approve/reject technician KYC submissions.
   - Monitor platform activity, active bookings, and customer reviews.

<br />

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [`LICENSE`](./LICENSE) file for complete details.

<br />

---

<div align="center">
  <b>Built with ❤️ by <a href="https://github.com/Parinay-Chauhan">Parinay Chauhan</a></b>
</div>
