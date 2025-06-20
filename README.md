#  Dev Tools Hub

> Your personal toolbox in the cloud — manage, track, and explore your favorite developer tools with ease.  
> Built with using **React**, **Node.js**, **Express**, **Prisma**, and **Supabase**.

![Vercel](https://img.shields.io/badge/frontend-vercel-black?logo=vercel&style=flat-square)
![Render](https://img.shields.io/badge/backend-render-blue?logo=render&style=flat-square)
![Supabase](https://img.shields.io/badge/database-supabase-3ECF8E?logo=supabase&style=flat-square)
![License](https://img.shields.io/github/license/your-username/dev-tools-hub?style=flat-square)

---

## 🌐 Live Link
https://dev-hub-tools.vercel.app/

---

## 🧠 What is Dev Tools Hub?

Dev Tools Hub is a centralized platform designed to streamline how developers manage and interact with their essential tools. In the fast-paced world of software development, it's easy to lose track of useful utilities, frameworks, or APIs. Dev Tools Hub solves this by offering a personal, cloud-based space where developers can organize, categorize, and revisit their favorite tools anytime, from anywhere. Whether you're a student, freelancer, or professional engineer, this app enhances productivity by reducing the friction of tool discovery and access, allowing you to focus more on building and less on searching.

---

## 🔍 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Axios + JWT
- React Router DOM

### Backend
-  Node.js + Express
-  JSON Web Tokens (JWT)
-  Prisma ORM
-  Supabase PostgreSQL

---

## ⚙️ Local Development Setup

<details>
<summary> Backend Setup </summary>

```bash
# Go to server folder
cd Server

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Run the server
npm run dev
```

</details>

</details> <details> <summary>Frontend Setup </summary>
  
```bash 
cd Client

# Install dependencies
npm install

# Set VITE_API_URL in .env
VITE_API_URL=https://your-backend.onrender.com/api

# Start the dev server
npm run dev

