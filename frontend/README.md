# 🚗 Car Models & Salesman Commission – Frontend (React + Vite)

This is the frontend for the **Car Model Management** and **Salesman Commission Report** system.
Built with **React (Vite)**, **React-Bootstrap**, **CKEditor**, and a clean modular architecture.

---

## 📁 Project Structure

```
src/
│── App.jsx
│── main.jsx
│── api/
│   ├── http.js
│   ├── carModel.api.js
│   └── commission.api.js
│
│── components/
│   ├── CarModels/
│   │   ├── CarModelForm.jsx
│   │   ├── CarModelForm.css
│   │   └── CarModelList.jsx
│   │
│   └── Commission/
│       ├── CommissionTable.jsx
│       └── CommissionPivotTable.css
│
│── pages/
│   ├── CarModelsPage.jsx
│   └── CommissionPage.jsx
│
│── assets/
│── styles/
└── index.css
```

---

## ⚙️ Tech Stack

* **React (Vite)**
* **React-Bootstrap**
* **Axios**
* **CKEditor 5 (Rich Text Editor)**
* **Modular API layer**
* **Reusable components**
* **Fully responsive UI**

---

## 🚀 Features

### ✅ **Car Model Management**

* Create, Update, Delete Car Models
* Fields include:

  * Brand, Class, Model Name
  * Model Code (10-character alphanumeric)
  * Description & Features (CKEditor)
  * Price, Date of Manufacturing
  * Active toggle
  * Sort Order
  * Image upload (multiple, size-validated)
* Search by:

  * Model Name
  * Model Code
* Sorting by:

  * Sort Order
  * Latest
  * Manufacturing Date
* Persistent form modal with proper reset logic

---

### 📊 **Salesman Commission Report**

* Fetches backend-generated commission rules & results
* Shows report in pivot-style table:

  * Salesman → Class → Brand → Quantity
* Includes:

  * Sorting
  * Previous year sales
  * Export CSV feature
* Clean UI with dark theme

---

## 🛠️ Setup Instructions

### 1️⃣ Install Dependencies

```
npm install
```

### 2️⃣ Create `.env` file

```
VITE_API_URL=http://localhost:5000/api
```

### 3️⃣ Start App

```
npm run dev
```

---

## 🔗 API Structure

### **Car Model API (`carModel.api.js`)**

* `GET /car-models`
* `POST /car-models`
* `PUT /car-models/:id`
* `DELETE /car-models/:id`

### **Commission API (`commission.api.js`)**

* `GET /reports/commission`
* `GET /reports/commission/export`

---

## 🎨 UI/UX Highlights

* Bootstrap-based layout
* Modal-based Car Model CRUD
* CKEditor integrated for rich text
* Auto-reset on modal close
* Error validation on submit only
* Image preview in edit mode
* Pivot-style commission UI

---

## 📦 Build

```
npm run build
```

Output will be in `/dist`.

---

## 📄 Notes

* Works seamlessly with the Node.js + PostgreSQL backend
* Follows component-based + modular structure
* Clean API abstraction for easy consumption
* Easily expandable (e.g., dashboards, filters, charts)

