# **Car Dealership Practical Test — Backend & Frontend**

A full-stack MERN-like project using **Node.js (ES Modules) + Express + PostgreSQL + Knex + React**
Includes:

-   Car Model CRUD
-   Image Upload
-   Encrypted DB fields
-   Salesman Commission Report with CSV export
-   Clean modular architecture

---

## 🚀 Tech Stack

### **Backend**

-   Node.js (ES Modules)
-   Express.js
-   PostgreSQL
-   Knex.js (No Sequelize/Prisma)
-   AES-256-GCM encryption
-   Multer (File uploads)
-   Winston (Logging)
-   Joi (Validations)

### **Frontend**

-   React (Vite)
-   Axios
-   CKEditor
-   Simple CSS/UI

---

## 📂 Project Structure (Backend)

```
backend/
  src/
    app.js
    config/
    libs/
    core/
    modules/
      carModel/
      commission/
    middlewares/
    utils/
  knexfile.cjs
  server.js
```

---

## 🔐 Encrypted DB Fields

The following fields use **AES-256-GCM encryption**:

-   modelCode
-   description
-   features
-   price
-   dateOfManufacturing

Stored as:

```
iv:tag:cipherHex
```

---

## 🧩 Features

### **Car Model Module**

✔ Create model
✔ Update model
✔ Delete model
✔ List + search + sorting
✔ Upload multiple images (max 5MB each)
✔ Thumbnail
✔ CKEditor for description & features
✔ All sensitive fields encrypted in DB

### **Commission Module**

✔ Salesmen seeds included
✔ Sales data seeds included
✔ Commission calculation rules
✔ Extra 2% for A-Class if previous sales > $500,000
✔ API for full report
✔ Filters (salesman, brand, class)
✔ Sorting (totalCommission)
✔ CSV export

---

## 🛠 Scripts

### Backend

```
npm install
npm run dev
```

### Run migrations

```
npx knex migrate:latest
```

### Run seeds

```
npx knex seed:run
```

### Frontend

```
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Car Models

| Method | Route                        | Description          |
| ------ | ---------------------------- | -------------------- |
| GET    | `/api/car-models`            | List + search + sort |
| POST   | `/api/car-models`            | Create               |
| GET    | `/api/car-models/:id`        | Single model         |
| PUT    | `/api/car-models/:id`        | Update               |
| DELETE | `/api/car-models/:id`        | Delete               |
| POST   | `/api/car-models/:id/images` | Upload images        |

---

### Commission Report

| Method | Route                            | Description           |
| ------ | -------------------------------- | --------------------- |
| GET    | `/api/reports/commission`        | Full report + filters |
| GET    | `/api/reports/commission/export` | CSV export            |

---

## 🧪 Testing

Use Postman or Thunder Client.

Example body for Car Model:

```json
{
    "brand": "Audi",
    "class": "A-Class",
    "modelName": "A1 Sedan",
    "modelCode": "AUDIA12345",
    "description": "<p>Luxury model</p>",
    "features": "<ul><li>ABS</li></ul>",
    "price": 30000,
    "dateOfManufacturing": "2025-01-01T10:00",
    "active": true,
    "sortOrder": 1
}
```

---

## 🧑‍💻 Author

Created by **Sahil Mangukiya**
Full Stack Developer
Node.js | React | PostgreSQL | Knex.js

