<p align="center">
  <img src="https://mochi.elitedev.space/favicon/favicon.svg" alt="Mochi Logo" width="90" height="90" />
</p>

<h1 align="center">Mochi Frontend</h1>

<p align="center">
  <strong>A stunning, real-time website monitoring and uptime tracking dashboard.</strong>
</p>

<p align="center">
  Monitor server health, visualize latency metrics, and configure instant notifications from a sleek, interactive, and responsive web client — built with React 19, Tailwind CSS v4, and Clerk authentication.
</p>

<p align="center">
  <a href="https://typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://vite.dev"><img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://clerk.com"><img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square&logo=clerk&logoColor=white" alt="Clerk Auth" /></a>
  <img src="https://img.shields.io/badge/License-ISC-007EC6?style=flat-square" alt="License" />
</p>

---

Mochi Frontend is the beautiful, highly interactive dashboard that allows users to manage their cron monitoring jobs, view response metrics, track real-time pings, and view latency records inside elegant tables and charts. Designed with a premium, accessible, and fast interface utilizing Tailwind CSS v4's modern styling engine.

## ✨ Key Features

* 📊 **Interactive Monitoring:** Real-time status badges, response latency tracking, and success metrics.
* 🌓 **Fluid Dark Mode:** Integrated dark/light mode toggle with responsive transitions.
* 🛡️ **Seamless Auth Flow:** Frictionless Clerk sign-in and protected route filters.
* 🌀 **Premium Loaders:** Custom dot-matrix glowing loading states during auth state evaluation.
* 📱 **Fully Responsive:** Optimized pixel-perfect layout across desktop, tablet, and mobile views.
* 📈 **Analytics Visualizer:** Detailed list graphs and logs for the last 50 checks per website.

---

## 🛠️ Technology Stack

* **Build Tool:** Vite 6
* **UI Engine:** React 19 (TypeScript)
* **Styling (CSS):** Tailwind CSS v4 (vanilla flex/grid control)
* **Icons:** Lucide React
* **Auth System:** Clerk React SDK
* **Network Client:** Axios

---

## ⚙️ Installation & Setup

### 1. Navigate to the Frontend Folder
If inside the project workspace:
```bash
cd Elite-Cron-Frontend
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of the frontend folder:
```env
VITE_API_URL="http://localhost:3000/api/v1"
VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
VITE_GITHUB_REPO_URL="https://github.com/AshutoshDM1/Mochi"
```

### 4. Boot the Vite Dev Server
```bash
pnpm run dev
```
The application will launch on your local host (usually `http://localhost:5173`).

---

## 📁 Directory Structure

```
src/
├── assets/         # Static global visual assets
├── components/     # Reusable UI component catalog
│   ├── auth/       # Clerk route guards & sign-in gates
│   ├── common/     # Headers, footers, & top navigation bar
│   └── ui/         # Base buttons, input blocks, & togglers
├── lib/            # Custom context APIs (Theme, etc.)
├── modules/        # Primary page layouts & routing components
│   ├── Auth/       # Login gates & welcome screens
│   ├── Home/       # Main monitoring dashboard
│   └── Privacy/    # Policy and terms page layouts
├── App.tsx         # Main entry point & React routing stack
└── main.tsx        # DOM bootstrap
```

---

## 🛡️ Routing & Protection Guard

The dashboard uses a custom `<RequireDashboardAccess />` wrapper. It checks Clerk's verification state before letting a user enter `/dashboard`:

1. **`ClerkLoading`**: Renders the custom glowing dot-matrix beacon (`DotmSquare8`) while loading session cookies.
2. **`ClerkLoaded`**: 
   - If not logged in, redirects instantly to the Login Gate (`/`).
   - If logged in, mounts the `/dashboard` core metrics screen.

---

## 📄 License

Distributed under the ISC License. See `package.json` for details.
