# Vertex Digital Frontend

Vertex Digital is a computer repair shop website with a protected dashboard for managing repair tickets, staff accounts, and shop operations.

## What This App Does

- Public landing page for the repair shop
- Login-protected dashboard for employees, managers, and admins
- Repair ticket workflow for creating, viewing, and editing notes
- Role-based user management for staff administration
- Persistent authentication with JWT and Redux Toolkit state management

## Tech Stack

- React 19
- Vite
- React Router
- Redux Toolkit and RTK Query
- Font Awesome icons

## Getting Started

Install dependencies in the frontend folder:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

- `npm start` - start the Vite dev server
- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

## Notes

- The frontend expects the backend API to be running separately.
- Authentication and protected routes are part of the dashboard experience.
- If you want, this README can also be expanded with screenshots, live demo links, and a services section for the repair shop.
