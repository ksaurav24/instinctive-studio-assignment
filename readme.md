```markdown
# SecureSight Incident Dashboard – Technical Architecture Report

## 📌 Project Overview

SecureSight is a fictional surveillance analytics system. This technical assignment implements the **incident monitoring dashboard**, allowing users to:

- View CCTV-based incident logs
- Play incident clips (stubbed/static)
- Mark incidents as resolved
- Operate over a realistic data model and modern stack

---

## 🏗️ Project Scope

### ✅ Mandatory Features
- Incident Player (left side)
- Incident List with resolve capability (right side)
- Navbar
- API + Database with seed data

### ⚙️ Optional Features (Extra Credit)
- Timeline scrubber under player (SVG/canvas)
- 3D model interface (React Three Fiber)

---

## 🧱 Tech Stack

| Layer       | Technology               |
|------------|---------------------------|
| Frontend    | Next.js 15 App Router, TailwindCSS |
| Backend     | Node.js + Express        |
| ORM         | Prisma ORM               |
| Database    | PostgreSQL (local/Neon)  |
| Runtime     | ts-node-dev (dev), Node.js (prod) |
| Deployment  | Vercel (frontend), Render/Railway (backend) |
| Dev Tools   | TypeScript, ESLint, dotenv |

---

## 🔁 High-Level Architecture

```

```
               ┌────────────────────┐
               │     Frontend       │
               │ (Next.js 15 App)   │
               └────────┬───────────┘
                        │
                        ▼
    ┌─────────────────────────────┐
    │ HTTP API (Node.js + Express)│
    └────────┬────────────┬───────┘
             │            │
             ▼            ▼
    Prisma ORM       Static Media (public/)
             │
             ▼
       PostgreSQL DB (Cloud/Local)
```

```

---

## 🧩 Folder Structure

```

/secure-sight
├── frontend/              # Next.js App Router UI
│   └── app/               # App structure + routing
│       └── api/           # API proxy calls (optional)
│       └── components/    # Navbar, IncidentList, Player
├── backend/
│   └── src/
│       ├── controllers/   # Incident controller logic
│       ├── routes/        # Express routes
│       ├── prisma/        # Prisma Client
│       ├── seed/          # Seeder script
│       └── index.ts       # Server entry
│   └── prisma/            # schema.prisma
├── .env
└── README.md

````

---

## 🧬 Data Model

### Camera

```prisma
model Camera {
  id        Int       @id @default(autoincrement())
  name      String
  location  String
  incidents Incident[]
}
````

### Incident

```prisma
model Incident {
  id           Int      @id @default(autoincrement())
  cameraId     Int
  camera       Camera   @relation(fields: [cameraId], references: [id])
  type         String
  tsStart      DateTime
  tsEnd        DateTime
  thumbnailUrl String
  resolved     Boolean  @default(false)
}
```

---

## 🛠️ API Reference

### GET `/api/incidents?resolved=false`

* Fetch unresolved incidents (default behavior)
* Ordered by timestamp (desc)
* Includes camera info

### PATCH `/api/incidents/:id/resolve`

* Toggle `resolved = true` for an incident
* Returns updated incident

---

## 🧪 Seed Script (`seed.ts`)

* Inserts 3 camera locations:

  * Shop Floor A, Vault, Entrance
* Inserts 12 incident logs across 24 hours
* 3 Threat types:

  * Gun Threat, Unauthorised Access, Face Recognised
* Randomized timestamps, camera assignments, thumbnail paths

---

## 🖥️ Frontend Behavior

### Incident Player

* Renders stub video (`/public/video.mp4`) or static frame
* Mini thumbnail strip for 2 other recent incidents

### Incident List

* Shows:

  * Thumbnail, Type, Time, Location
  * "Resolve" button
* Optimistic UI:

  * Fades out on click
  * Backend patch → updated UI

---

## ⚙️ Dev Commands

### Backend

```bash
pnpm install
npx prisma migrate dev
pnpm run seed
pnpm run dev
```

### Frontend

```bash
pnpm install
pnpm run dev
```

---

## 🚀 Deployment Notes

### Backend

* Host on Render/Railway
* `.env` with `DATABASE_URL`

### Frontend

* Deploy via Vercel
* Point to API base URL via `NEXT_PUBLIC_API_URL`

---

## 🔒 Environment Variables

```env
DATABASE_URL="postgresql://user:pass@host:port/db"
PORT=4000
```

---

## 📦 Future Improvements

* Real-time incident updates via WebSocket
* Video player syncing with timeline
* Auth system for multi-admin control
* Role-based access (viewer vs supervisor)
* Upload + S3 storage for actual CCTV footage
* 3D route using React Three Fiber (extra credit)

---

## ✅ Submission Checklist

* [x] Public GitHub repo
* [x] Hosted link (Vercel + Render)
* [x] Seeded data with realistic incidents
* [x] API endpoints and frontend integrations
* [x] README with deployment + tech breakdown

---

## 🔗 References

* Figma Design: [Figma UI](https://www.figma.com/design/v3gdcLjbIWn4kXybewFZgw/Full-Stack-Developer-Internship-TA)
* Prisma Docs: [https://www.prisma.io/docs](https://www.prisma.io/docs)
* Neon: [https://neon.tech](https://neon.tech)

```

Use as `README.md` or as an attachable PDF for submission.
```
