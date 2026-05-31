# Olofssons Skog & Mäkleri

Premium real estate website for bostäder and jord-/skogsfastigheter in northern Sweden.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS → **Vercel**
- **Backend**: Node.js, Express, TypeScript → **Render / Railway / Fly.io**
- **Database**: MongoDB Atlas + Prisma
- **Images**: Cloudinary
- **Auth**: JWT (admin panel)

## Local Development

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: DATABASE_URL, JWT_SECRET, CLOUDINARY_*, CLIENT_URL
npx prisma db push
npm run prisma:seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Default admin: `admin@nordmark.se` / `Admin123!`

---

## Production Deployment

The frontend and backend deploy separately. **Vercel hosts only the Next.js app** — the Express API must run on another platform.

### 1. Deploy the API (Render example)

1. Create a **Web Service** pointing to the `backend` folder
2. **Build command**: `npm install && npm run build`
3. **Start command**: `npm start`
4. Set environment variables:

| Variable | Example |
|----------|---------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random secret |
| `CLIENT_URL` | `https://your-site.vercel.app,https://www.your-domain.se` |
| `ALLOW_VERCEL_PREVIEWS` | `true` (optional, for Vercel preview URLs) |
| `CLOUDINARY_CLOUD_NAME` | … |
| `CLOUDINARY_API_KEY` | … |
| `CLOUDINARY_API_SECRET` | … |

5. After deploy, note your API URL (e.g. `https://your-api.onrender.com`)
6. Run once: `npx prisma db push && npm run prisma:seed`

Health check: `GET https://your-api.onrender.com/api/health`

### 2. Deploy the frontend (Vercel)

1. Import the Git repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | `https://your-api.onrender.com/api` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-site.vercel.app` (or custom domain) |

5. Deploy

`NEXT_PUBLIC_SITE_URL` is used for Open Graph links. If omitted, Vercel’s `VERCEL_URL` is used automatically during build.

### 3. CORS checklist

- Backend `CLIENT_URL` must include every frontend origin (production + custom domain)
- Set `ALLOW_VERCEL_PREVIEWS=true` if you use Vercel preview deployments
- Redeploy the API after changing `CLIENT_URL`

### 4. Post-deploy verification

- [ ] Homepage loads featured properties
- [ ] `/fastigheter` lists properties
- [ ] `/fastigheter/hallviken-106` opens detail page
- [ ] `/admin/login` works and can create/edit listings
- [ ] Contact form submits successfully

---

## Project Structure

```
├── frontend/     Next.js app (Vercel)
├── backend/      Express API
└── README.md
```
