 
# SecureSight – Internship Technical Assignment

## 🚀 Live Demo

- **Frontend**: [https://securesight-dashboard.vercel.app](https://securesight-dashboard.vercel.app)
- **3D Assignment (WIP)**: [https://securesight-dashboard.vercel.app](https://securesight-dashboard.vercel.app)
- **Backend API**: [https://securesight-api.onrender.com](https://securesight-api.onrender.com)

> ⚠️ The deployed application uses a **cloud-hosted PostgreSQL** database provisioned via **Aiven.io**. For local testing, a PostgreSQL container is included with Docker Compose.

---

## 🧠 Tech Stack & Decisions

**Frontend**
- **Framework**: [Next.js 14](https://nextjs.org/) – Edge-ready, App Router, built-in API routes.
- **Styling**: [TailwindCSS](https://tailwindcss.com) – Utility-first styling for rapid prototyping.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) – Smooth, declarative UI transitions.
- **3D/GLTF**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://docs.pmnd.rs/drei) for WebGL-based interactive model rendering.

**Backend**
- **Framework**: [Express.js + TypeScript](https://expressjs.com) – Simple REST API with strong typing.
- **ORM**: [Prisma ORM](https://www.prisma.io) – Type-safe database access.
- **Database**: [PostgreSQL](https://www.postgresql.org)

**Infrastructure**
- **DevOps**: Docker, Docker Compose (local)
- **Hosting**:
  - Frontend → [Vercel](https://vercel.com)
  - Backend → [Render](https://render.com)
  - DB → [Aiven Cloud PostgreSQL](https://aiven.io)

---

## 🛠️ Local Development (Dockerized Setup)

```bash
git clone https://github.com/ksaurav/instinctive-studio-assignment.git
cd instinctive-studio-assignment
docker-compose up --build
````

### Services Available Locally:

* Frontend → `http://localhost:3000`
* Backend API → `http://localhost:4000`
* PostgreSQL → Port `5432`

---

## ⚙️ Environment Variables

### `/server/.env`

```env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@db:5432/securesight
```

### `/client/.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```
> In production, environment variables are pointed to the deployed Render/Vercel/Aiven instances.

## 🧩 Manual Setup (Without Docker)

### Backend

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd ../client
npm install
npm run dev
```

## 📁 Directory Structure

```
/
├── client/               # Frontend: Next.js 14 + TailwindCSS + 3D model
├── server/               # Backend: Node.js + Express + Prisma
├── docker-compose.yml    # PostgreSQL + Multi-service orchestration
└── README.md
```

## 📦 Deployment Instructions

### Production Deployment (Live)

* **Frontend**: Automatically deployed to Vercel on push to `main`
* **Backend**: Auto-deployed to Render from `server/` folder
* **Database**: Hosted via Aiven PostgreSQL cloud instance

### Self-Hosting Steps

1. Provision PostgreSQL or use Docker.
2. Deploy backend to any Node-compatible host (e.g., Render, Railway).
3. Deploy frontend to any static frontend host (e.g., Vercel, Netlify).
4. Update `.env` files in both frontend and backend with the production URLs.
5. Set proper CORS, domain, and API proxy configurations.

---

## ⏳ If I Had More Time...

* Finalize and fully integrate 3D GLTF viewer with complete interactivity and attractive UI
* Implement auth layer with JWT or OAuth2 for the dashboard
* Optimize 3D rendering for performance on mobile devices
* Enable Server-Side Rendering (SSR) for critical frontend components
* Responsive dashboards for tablet and mobile
* Complete the canvas timeline below the video player for more functionalities
* Play the incident clip on clicking over the specific incident(Dynamic videos of incidents)
 
## 👤 Author

**Saurav Kale**
[Portfolio →](https://portfolio-git-master-ksaurav24s-projects.vercel.app)
Email: `ksaurav4093@gmail.com`
 
## 🪪 License

This project is published solely for internship evaluation. You are free to clone, run, and inspect the codebase.
 
 
