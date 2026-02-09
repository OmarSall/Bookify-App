# Bookify — Frontend

**Bookify** is a modern front-end web application built with **React 19 and TypeScript**, designed for browsing venues and managing bookings through a clean and intuitive user interface.

The application follows a component-driven architecture and integrates map-based views, advanced filtering, and protected user flows.

## Key Features

- Venue listing with filtering, sorting, and pagination
- Detailed venue pages with image galleries, booking cards, and location maps
- Authentication flow (login and sign-up)
- Protected user areas (bookings, favourites, hosting)
- Responsive layout built with reusable UI components

## Tech Stack

- React 19 + TypeScript
- Vite (development environment)
- Material UI (MUI)
- React Router
- Axios
- Leaflet / Google Maps API
- react-date-range

## Architecture Highlights

- Clear separation between pages, reusable components, and API services
- Centralized authentication handled via React Context
- Protected routes implemented with a dedicated authorization wrapper
- Custom hooks used to encapsulate business logic and side effects

## Getting Started (Development)

```bash
npm install
```
```bash
npm run dev
```

The application requires a configured backend API provided via environment variables.