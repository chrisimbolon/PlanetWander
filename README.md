
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🌍 PlanetWander

PlanetWander is an interactive city explorer web app built with React and powered by a lightweight JSON Server backend. It allows users to browse curated city data — including summaries, images, and locations — all packaged in a clean, responsive UI.

This project is Dockerized and deployed under a subpath using Caddy as the reverse proxy, simulating a production-grade deployment flow.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** JSON Server (mock API for city data)
- **DevOps & Deployment:** Docker, Docker Compose, Caddy reverse proxy

---

## 🚀 Live Demo

🔗 [chrisimbolon.dev/planetwander](https://chrisimbolon.dev/planetwander)

---

## 🧑‍💻 Features

- Browse a curated list of cities with name, summary, and country info
- Responsive layout built with Tailwind CSS
- Seamless communication between frontend and backend in a Docker network
- Subpath routing via Caddy (simulating real-world deployment constraints)

---

## 🐳 Local Development

Clone the repository and run it with Docker Compose:

```bash
git clone https://github.com/chrisimbolon/planetwander.git
cd planetwander
docker-compose up --build
<<<<<<< HEAD
=======

Frontend available at http://localhost:5173

Backend available at http://localhost:8000

Make sure VITE_API_URL=http://backend:8000 is correctly set in your .env file or Docker build args.

📁 Project Structure

planetwander/
├── Dockerfile    
├── README.md    
├── docker-compose.yml
├── index.html    
├── public/
└── src/

About the Project
PlanetWander is part of my developer portfolio. It showcases my ability to:

Set up fullstack projects with independent services

Use Docker and Compose to replicate production environments

Configure custom reverse proxy routing with Caddy

Build modular, maintainable frontend apps with a smooth UI

Author
Christyan Simbolon

🌐 Portfolio

💻 GitHub

🔗 LinkedIn
>>>>>>> 4d8cf10 (add an update README.md)
