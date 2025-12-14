# 🚀Collaborative Task Manager (Backend)

A scalable backend API for a real-time collaborative task management system built using **Node.js**, **Express**, **MongoDB (Native Driver)** and **Socket.io**.  
This backend handles authentication, task management, and real-time collaboration features.

---

## ✨ Features

- 🔐 JWT-based Authentication (Register / Login)
- 👤 User Management with unique User Code
- 📋 Task CRUD Operations
- 👥 Task Assignment using User Code
- ⚡ Real-Time task updates using Socket.io
- 🔔 Instant notification when a task is assigned
- 🛡️ Protected routes with authentication middleware
- 📊 Role-based task access (Creator / Assignee)
- 🧩 Clean modular architecture

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Native Driver)
- **Authentication:** JWT + HTTP-only cookies
- **Real-Time:** Socket.io
- **Validation:** Zod
- **Security:** bcrypt
- **Dev Tool:** ts-node-dev

---

## 📁 Project Structure
src/
├── config/
│ └── db.ts
├── middlewares/
│ ├── auth.middleware.ts
│ └── validate.middleware.ts
├── modules/
│ ├── auth/
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ └── auth.routes.ts
│ └── task/
│ ├── task.controller.ts
│ ├── task.service.ts
│ ├── task.dto.ts
│ └── task.routes.ts
├── socket.ts
├── app.ts
└── server.ts


---

## ⚙️ Prerequisites

- Node.js **v18+**
- MongoDB (Local or Atlas)
- npm or yarn

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/task-manager-backend.git
cd ablespace-backend
npm install


