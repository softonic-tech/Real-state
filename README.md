# Nordmark Fastigheter - Premium Property Management

A premium, Scandinavian-designed real estate brokerage and advisory website specializing in agricultural and forest properties in Sweden.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT
- **Image Storage**: Cloudinary

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6+ (local or Atlas)
- Cloudinary account

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB and Cloudinary credentials
npx prisma db push
npx prisma db seed
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Default Admin Credentials

- Email: admin@nordmark.se
- Password: Admin123!

## Project Structure

```
property-management/
├── frontend/          # Next.js 15 App Router
│   └── src/
│       ├── app/           # Pages (App Router)
│       ├── components/    # Reusable UI components
│       ├── hooks/         # Custom React hooks
│       ├── services/      # API service layer
│       ├── types/         # TypeScript interfaces
│       ├── utils/         # Utility functions
│       └── constants/     # App constants
├── backend/           # Express.js REST API
│   └── src/
│       ├── controllers/   # Request handlers
│       ├── routes/        # Route definitions
│       ├── services/      # Business logic
│       ├── middleware/     # Auth, validation, error handling
│       ├── validators/    # Request validation schemas
│       ├── types/         # TypeScript interfaces
│       └── utils/         # Helpers
└── README.md
```
