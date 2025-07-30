# CRM Dashboard

A modern Customer Relationship Management (CRM) dashboard built with React, TypeScript, and ShadcnUI. This application provides a comprehensive interface for managing customers, leads, sales, and business analytics.

![CRM Dashboard](public/images/crm.png)

## Features

- **Customer Management** - Add, edit, and track customer information
- **Lead Tracking** - Monitor and manage sales leads through the pipeline
- **Sales Analytics** - Visualize sales data with interactive charts and reports
- **Task Management** - Create and track follow-up tasks and activities
- **Contact Management** - Organize and search through contact databases
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Toggle between themes for better user experience
- **Global Search** - Quickly find customers, leads, or any data across the system
- **Role-based Access** - Different permission levels for team members

## Tech Stack

**Frontend:** React 18 + TypeScript + Vite
**UI Framework:** ShadcnUI (TailwindCSS + RadixUI)
**Routing:** TanStack Router
**State Management:** React Query + Zustand
**Charts:** Recharts
**Authentication:** Clerk
**Icons:** Tabler Icons
**Linting:** ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/tamkyn-agency/crm
cd crm
```

2. Install dependencies

```bash
bun install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration values.

4. Start the development server

```bash
bun dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
bun build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
