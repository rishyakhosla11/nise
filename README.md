# NISE – Student Move-In Organizer

**NISE** NISE is a React + TypeScript application built with Vite that helps students moving into apartments stay organized and efficient. From tracking chores and meal planning to managing routines and shopping lists, NISE simplifies your new independence.

---

## Tech Stack

- **React** – Frontend library for building user interfaces
- **TypeScript** – Strong typing for better maintainability
- **Vite** – Lightning-fast bundler and dev server
- **Tailwind CSS** – Utility-first CSS framework for styling
- **React Router** – Client-side routing
- **TanStack Query** – Powerful data-fetching and caching
- **Custom Hooks** – For reusable logic like toast notifications and mobile detection

---

## Project Structure

src/
├── components/ # Reusable UI components
│ └── sections/ # Task-focused UI (e.g. FoodSection, CleaningSection)
│ └── ui/ # Low-level shared components (e.g. Tooltip, Toast)
├── hooks/ # Custom React hooks (e.g. use-toast)
├── lib/ # Utility functions
├── pages/ # Top-level routed pages (Home, Index, NotFound)
├── App.tsx # Root component with routing and providers
├── main.tsx # Entry point
├── index.css # Global Tailwind and base styles

## Getting Started

1. **Install dependencies**
   ```bash
   npm install


2. **Run the app locally**
   npm run dev


3. **Build for production**
  npm run build

---

## Features in Progress

- Modular sections for food, cleaning, routines, and clothing
- Custom toast notifications
- Mobile-friendly responsive UI
- Easy future add-ons like roommate sync or budget tracking


