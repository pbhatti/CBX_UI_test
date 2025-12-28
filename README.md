# Initiative Prototype

A modern web application for managing initiatives, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Collapsible Navigation Sidebar** (240px width, collapses to 64px)
- **Initiatives Table** with filtering, sorting, and pagination
- **Modern UI** built with shadcn/ui components
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** following Figma design specifications

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **UI**: shadcn/ui (Radix) + Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: react-hook-form + zod (ready for future use)
- **Data Fetching**: TanStack Query (ready for API integration)
- **Icons**: lucide-react

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── navigation-sidebar.tsx
│   ├── header.tsx
│   ├── filter-bar.tsx
│   ├── initiatives-table.tsx
│   └── pagination.tsx
└── lib/
    └── utils.ts         # Utility functions
```

## Design System

The application follows the design system from the Figma file, including:
- Exact color values (#121212, #303030, #eaeaea, etc.)
- Typography (Different Sans font family)
- Spacing and border radius values
- Component styles matching the design

## Next Steps

- Connect to a backend API using TanStack Query
- Implement form handling with react-hook-form + zod
- Add more interactive features and animations
- Implement real filtering and sorting functionality

