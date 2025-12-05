# 🚗 Car Dealership Backend — Practical Test

**Node.js + Express + PostgreSQL + Knex (ES Modules)**

---

# PART 1 — Architecture Documentation

## **Q1 — Backend Architecture Implementation**

### **1. Modular Express API (Latest Version + ES Modules)**

The backend follows a **layered architecture**:

```
Route → Controller → Service → Repository → Database
```

Directory Structure:

```
src/
  config/
  core/
  libs/
  middlewares/
  modules/
    carModel/
    commission/
  utils/
```

---

### **2. Mapping Layer (DB Row → DTO → View Model)**

Located in:

```
src/modules/carModel/carModel.mapper.js
```

Purpose:

-   Convert encrypted DB fields to decrypted DTO.
-   Normalize naming (`model_name` → `modelName`).
-   Avoid exposing internal DB structure to frontend.

---

### **3. Scalable Architecture (Controllers / Services / Repositories / Utils)**

| Layer          | Responsibility                                         |
| -------------- | ------------------------------------------------------ |
| **Routes**     | Define HTTP endpoints                                  |
| **Controller** | Request validation & response handling                 |
| **Service**    | Business logic (commission, sorting, encryption, etc.) |
| **Repository** | DB access using Knex                                   |
| **Mapper**     | Convert DB rows <-> DTO                                |
| **Utils**      | Common helpers (encryption, API response, etc.)        |

---

### **4. Global Error Handling + Logging**

-   Centralized error handler: `src/core/ErrorHandler.js`
-   Custom error class: `AppError.js`
-   Logging:

    -   Logs request errors
    -   Logs DB connection
    -   Stored in `logs/error.log`
    -   Uses Winston

---

### **5. Generic HTTP Client**

File:

```
src/core/HttpClient.js
```

Features:

-   Base class for external API calls
-   Built on native `fetch`
-   Retry + timeout + structured errors

---

### **6. Reusable Patterns & Generics**

-   Standard API response wrapper: `ApiResponse.js`
-   Reusable `validate()` middleware for Joi
-   Reusable Knex repository patterns
-   Standard CRUD service pattern used across modules

---

### **7. async/await Used Everywhere**

-   No callbacks
-   All DB queries, encryption, file writes, and external calls use async/await.

---

### **8. Database-level Encryption**

Implemented using **AES-256-GCM** in:

```
src/libs/crypto.js
```

Encrypted fields:

| Field               | Reason                                               |
| ------------------- | ---------------------------------------------------- |
| modelCode           | Sensitive & used for search (hash stored separately) |
| description         | Rich-text, may contain internal data                 |
| features            | Sensitive configuration                              |
| price               | Prevent direct exposure                              |
| dateOfManufacturing | Internal value                                       |

Format stored in DB:

```
iv:tag:cipherTextHex
```

Search on `modelCode` uses deterministic `hash(modelCode)`.

---

# PART 2 — Architecture Questions

## **1. What architecture pattern have you created?**

A **Modular Layered Architecture**:

```
Presentation (Routes)
↓
Controller Layer
↓
Service Layer
↓
Repository Layer
↓
Database (Knex + PostgreSQL)
```

This ensures separation of concerns and easy scalability.

---

## **2. Explain the responsibilities of each module/layer.**

| Layer            | Explanation                            |
| ---------------- | -------------------------------------- |
| **Routes**       | Exposes endpoints                      |
| **Controllers**  | Handle HTTP, validation, mapping input |
| **Services**     | Business logic, operations, encryption |
| **Repositories** | Database CRUD using Knex               |
| **Mappers**      | Transform DB rows ↔ DTO                |
| **Core Utils**   | Error handling, logging, HTTP client   |
| **Middlewares**  | Validation, file upload, 404           |

---

## **3. What security measures are implemented?**

AES-256-GCM encryption
Input validation using Joi
Multer file-size validation (max 5MB)
Knex parameterized queries
Error sanitization
Logging of suspicious requests
Hashing `modelCode` for safe search
Environment variables (no secrets in code)

---

## **4. Does your implementation prevent SQL injection? How?**

Yes, because:

-   All DB calls use **Knex parameterized queries**.
-   All user inputs pass through **Joi validation**.
-   No raw SQL is used anywhere.
-   Repository layer isolates DB logic, preventing misuse.

---

## **5. What data normalization level have you used and why?**

The database is structured to follow **3rd Normal Form (3NF)**:

-   Separate tables: `car_models`, `car_model_images`, `salesmen`, `sales`
-   No repeating groups
-   No nullable redundant columns
-   Referential integrity (foreign keys applied)

3NF ensures:

-   Scalability
-   Reduced duplication
-   Data consistency

---

# PART 3 — Technical Tasks

## **Q1 — Car Model Management Module**

### Implemented Features

CRUD operations
AES-encrypted fields
Hash-based search
Multiple image upload (max 5 MB each)
CKEditor-friendly fields
Sorting (latest, date, sortOrder)
Thumbnail preview
Filters on model name/code
Class-based dynamic fields (feature, price differences)

---

## **Q2 — Salesman Commission Report**

### Includes:

Commission rules implemented exactly as per test
Extra +2% for A-class if previous sales > $500,000
CSV export
Filtering & sorting
Joining sales + salesmen data
Nested calculation engine

---

# 🧪 API ENDPOINTS

### Car Models

| Method | Endpoint                     | Function             |
| ------ | ---------------------------- | -------------------- |
| GET    | `/api/car-models`            | list + search + sort |
| POST   | `/api/car-models`            | create               |
| GET    | `/api/car-models/:id`        | get                  |
| PUT    | `/api/car-models/:id`        | update               |
| DELETE | `/api/car-models/:id`        | delete               |
| POST   | `/api/car-models/:id/images` | upload images        |

---

### Commission Report

| Method | Endpoint                         | Function        |
| ------ | -------------------------------- | --------------- |
| GET    | `/api/reports/commission`        | generate report |
| GET    | `/api/reports/commission/export` | CSV export      |

---

# 🧰 Backend Setup Instructions

### Install packages

```
npm install
```

### Run migrations

```
npm run migrate
```

### Seed initial data

```
npm run seed
```

### Start server

```
npm run dev
```

Server runs at:

```
http://localhost:5000
```