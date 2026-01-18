# 🚀 Programmer_2003 Portfolio

A sleek, responsive, and high-performance portfolio website built with **React**, **Tailwind CSS**, and **Framer Motion**. This project features a dynamic multi-language system, dark mode support, and a data-driven architecture for easy customization.

---

## ✨ Key Features

* **🌍 Multi-language Support:** Seamlessly switch between English, Tajik (Cyrillic), Persian (RTL), and Russian. Automatic layout adjustment for RTL languages.
* **🌓 Dark & Light Mode:** Fully responsive theme switching that persists using local storage.
* **🎭 Smooth Animations:** Powered by `framer-motion` for a premium, application-like feel with staggered entrance effects.
* **📊 Data-Driven Content:** Centralized JSON files (`home_ui.json`, `about_ui.json`) allow you to update your skills, experience, and education without touching the React code.
* **📱 Fully Responsive:** Optimized for all screen sizes, from mobile devices to ultra-wide monitors.
* **📜 Dynamic Experience & Education:** Custom timeline and card components to showcase professional growth.

---

## 🛠️ Tech Stack

* **Frontend:** React 18+ (Vite)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **State Management:** React Hooks (useState, useEffect)
* **Routing:** React Router DOM

---

## 📂 Project Structure

```bash
public/assets/        # Images, PDF, CV, and profile photos
src/ 
├── components/       # Reusable UI components (Navbar, Footer, Modal)
├── data/             # JSON files (The "Brain" of the project)
│   ├── blog/         # blog.json data
│   └── projects/     # details_ui.json & projects.json data
├── pages/            # Page components (Home.jsx, About.jsx, Projects.jsx)
│   ├── blogs/        # Blog.jsx & BlogData.jsx
│   └── projects/     # Projectx.jsx & ProjectDetails.jsx 
├── App.js            # Main routing and language context logic
├── index.css         # Styles for whole app
└── main.jsx          # Entry point