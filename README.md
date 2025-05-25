# 📚 BookReview Platform - Frontend (MERN)

A modern and responsive web platform where users can explore, review, and rate their favorite books. Built using the MERN stack, this project is part of a full-stack developer assignment to demonstrate proficiency in creating scalable and user-friendly applications.

---

## 🎯 Objective

Build a full-featured Book Review Platform where users can browse books, submit and read reviews, and manage their profiles. Admins can manage book listings and suggestions. The application uses **React.js** for the frontend, **Node.js + Express.js** for the backend, and **MongoDB** for data storage.

---

## 🌐 Live Demo

👉 [Visit Live Website](insertlink/)

---

## 🚀 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, React Router, Context API  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  

---

## 📂 Backend Repository

👉 [BookReview Platform Backend Repository](https://github.com/sadvika05/book-review-platform-backend)

---

## ✨ Features

- 🔍 Search and filter books by title or category
- 📚 Suggest new books to be added
- 📝 Write and view reviews for each book
- 🔐 User authentication (Email & Google OAuth)
- 👤 User profile with editable details
- 🛠️ Admin panel:
  - Add or remove books
  - Manage book suggestions
- 📱 Responsive design for all screen sizes
- 🛡️ Secure API interactions and error handling

---

## 🧩 Project Structure

```
BookReview-Platform-MERN-FE/
│
├── src/
│   ├── Components/     # Reusable UI components
│   ├── Pages/          # Application pages (Home, Login, Book Details, etc.)
│   ├── Hooks/          # Custom React Hooks
│   ├── Providers/      # Context API Providers
│   ├── api.js          # Axios setup for API calls
│   └── App.js          # Main App entry point
│
├── public/             # Static assets
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation (this file)
```

---

## ⚙️ Installation & Setup

Follow the steps below to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ashwinn-si/BookReview-Platform-MERN-FE.git
   cd BookReview-Platform-MERN-FE
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```bash
   REACT_APP_API_URL=
   REACT_APP_GOOGLE_API_ENDPOINT=
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The app will be available at: [http://localhost:3000](http://localhost:3000)

5. **Important:**
   - Make sure your backend server is also running locally.
   - Alternatively, configure the frontend to connect to your deployed backend.

---

## ✅ Assignment Requirements Covered
✅ Frontend
Responsive UI with key pages: Home, Book List, Book Details, User Profile

Review submission form

React Router for navigation

Context API for state management

API integration with loading and error states

✅ Backend (see backend repo)
RESTful endpoints: /books, /reviews, /users

Admin-specific actions

MongoDB integration

Input validation and error handling

## 📝 Evaluation Criteria Checklist
 Clean and organized codebase

 React Hooks and component-based design

 RESTful API integration

 Effective UI/UX

 Clear documentation

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
