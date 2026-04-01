# Project Kiosk - MERN Stack Application

A full-stack MERN application for an interactive kiosk system.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React, Vite
- **Database**: MongoDB
- **Authentication**: JWT
- **Styling**: CSS/Tailwind CSS

## Project Structure

```
Project Kiosk/
├── backend/              # Express.js API server
├── frontend/             # React + Vite application
├── docker-compose.yml    # Docker orchestration
└── README.md
```

## Prerequisites

- Node.js >= 16.x
- npm or yarn
- MongoDB (local or Atlas)
- Docker (optional)

## Getting Started

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

See `.env.example` files in both backend and frontend directories.

## Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

MIT
