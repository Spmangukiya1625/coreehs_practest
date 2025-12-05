# **Architecture Answers (Backend + Frontend + PostgreSQL)**

This document contains written answers for **Part 1 — Architecture Questions** from the practical test.

---

# **Q1 — Architecture Overview**

###  **Architecture Pattern Implemented**

I have implemented a **Layered (Modular) Architecture**, structured into:

* **Controllers** — Handle HTTP requests and responses
* **Services** — Business logic, validation, and orchestration
* **Repositories** — Database operations using Knex.js
* **DTO + Mapping Layer** — Converts DB rows ↔ API response models
* **Utilities Layer** — Encryption, API response wrapper, external API client
* **Middlewares** — Global error handler, request validation, logging
* **Routes** — Organized per module

This structure keeps the codebase clean, testable, and scalable.

---

# **Q2 — Architecture Questions**

---

## **1. What architecture pattern have you created?**

I used a **Layered Clean Architecture**, where each layer has distinct responsibility:

```
Routes → Controllers → Services → Repositories → Database
           ↓ DTO Mapping
```

* This pattern avoids tight coupling
* Makes debugging easy
* Allows scaling individual modules independently
* Ensures business logic is reusable and not mixed with request/response logic

---

## **2. Explain the benefits and responsibilities of each module/layer.**

### **🔹 Controller Layer**

* Receives HTTP requests
* Extracts query/body params
* Calls the service layer
* Returns unified JSON response using a common API wrapper

### **🔹 Service Layer**

* Contains business logic
* Applies validation and rules
* Calls repositories
* Applies encryption/decryption
* Converts DB rows into DTOs

### **🔹 Repository Layer**

* Performs database operations via Knex.js
* Uses parameterized queries for SQL injection safety
* Contains no business logic (DB-only responsibilities)

### **🔹 DTO / Mapping Layer**

* Normalizes API output
* Ensures frontend receives clean, consistent keys
* Converts encrypted DB fields to decrypted data before sending

### **🔹 Utilities Layer**

* AES-256-GCM encryption/decryption
* External API caller using Axios wrapper
* Standard API response formatter
* Custom error classes

### **🔹 Middleware Layer**

* Error handling
* Validation
* Logging
* NotFound handling

---

## **3. What security measures are implemented?**

###  **AES-256-GCM Encryption**

Used for storing sensitive fields such as:

* model code
* price
* description
* features
* date of manufacturing

###  **Hashing for Searching Encrypted Fields**

Since encrypted data cannot be searched directly, an **SHA-256 hash** is stored alongside for exact-match queries.

###  **SQL Injection Protection**

* Knex parameterized queries
* No raw string interpolation
* All user inputs validated

###  **Input Validation**

Backend validates all API inputs using custom rules.

###  **Sanitized Rich Text**

CKEditor content stored as sanitized HTML.

###  **CORS & Helmet (optional)**

Prevent common web vulnerabilities.

---

## **4. Does your implementation prevent SQL injection? Explain how.**

Yes.

### **Knex.js automatically parameterizes all queries**, preventing SQL injection:

```js
db("car_models").where("id", id)
```

Even when using dynamic filters, Knex internally escapes values safely.
No string concatenation is ever used for SQL queries.

Additionally:

* DTO validation prevents unsafe characters
* Repositories are the only place allowed to interact with DB

---

## **5. What data normalization level have you used and why?**

###  **3rd Normal Form (3NF)**

Tables follow 3NF because:

* Each table stores **one type of entity**
* Repeating groups are separated (e.g., images stored in car_model_images table)
* No composite or redundant data is stored
* Dependencies are only on primary keys

This ensures:

* Faster queries
* Reduced duplication
* Clean relational structure
* Future scalability

---

#  Summary

The architecture is:

* **Modular**
* **Scalable**
* **Secure**
* **Testable**
* **Production-ready**
