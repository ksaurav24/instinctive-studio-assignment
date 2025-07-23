# SecureSight – Internship Technical Assignment


## Live Demo

-  **Frontend**: [https://securesight-dashboard.vercel.app](https://securesight-dashboard.vercel.app)
-  **Backend**: [https://securesight-api.onrender.com](https://securesight-api.onrender.com)

> ⚠️ The deployed version uses a **cloud-hosted PostgreSQL** database provisioned via **Aiven.io**. For local testing, a development PostgreSQL container is included via Docker Compose.


## Tech Stack

> **Frontend:** Next.js 14, TailwindCSS, Framer Motion  
> **Backend:** Node.js, Express.js, TypeScript, Prisma ORM  
> **Database:** PostgreSQL (Aiven Cloud in Production)  
> **Hosting:** Vercel (Frontend), Render (Backend)  
> **DevOps:** Docker, Docker Compose, CI/CD Ready


## Local Development (Docker-Based)

Clone and launch all services locally:

```bash
git clone https://github.com/ksaurav/instinctive-studio-assignment.git
cd instinctive-studio-assignment
docker-compose up --build
````

This will start:

* `Frontend` at `http://localhost:3000`
* `Backend` at `http://localhost:4000`
* `PostgreSQL` database on port `5432`


## Environment Configuration

### `/server/.env` (used locally)

```env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@db:5432/securesight
```

### `/client/.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

> In production, these point to live Render/Vercel URLs and a cloud DB.

---

## Manual Setup (No Docker)

```bash
# Backend
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

# Frontend
cd ../client
npm install
npm run dev
```
 

## Directory Structure

```
/
├── client/       # Frontend: Next.js 14 + Tailwind
├── server/       # Backend: Node.js + Express + Prisma
├── docker-compose.yml
``` 
## Deployment Notes

* **Backend** hosted on [Render](https://render.com)
* **Frontend** hosted on [Vercel](https://vercel.com)
* **Production PostgreSQL** is hosted via \[Aiven.io]
* The included `docker-compose.yml` provides a **local PostgreSQL container** for testing and development purposes.
 

## Author

Technical Assignment by **Saurav Kale**
[Portfolio →](https://portfolio-git-master-ksaurav24s-projects.vercel.app)
 

## License

This project was built solely for internship evaluation purposes and is free to review, test, and clone for assessment.
