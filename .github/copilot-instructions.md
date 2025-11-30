# Copilot Instructions for CMIS-EventConnect

## Project Overview
CMIS-EventConnect is a **multi-role engagement platform** for Texas A&M's Council for Management of Information Systems (CMIS). The frontend is a React+Vite SPA with role-based routing and dashboards for Students, Judges, Instructors, and Admins. Built with Texas A&M branding (maroon #500000 + white theme).

## Architecture

### Routing & Layout (UPDATED)
- **Root Router** (`App.jsx`): Uses React Router v7 with authentication gate; redirects to `/login` if not authenticated
- **Auth State**: Stored in localStorage; uses `isLoggedIn` + `userRole` flags
- **Layout Component** (`components/Layout.jsx`): Role-aware shell with dynamic sidebar navigation
- **Dashboard Pages**: Separate dashboards for each role—`StudentDashboard`, `JudgeDashboard`, `InstructorDashboard`, `AdminDashboard`
- **Auth Flow**: Mocked (all passwords work); TODO: replace with real backend `/auth/login` and JWT tokens

### Key Files Structure
```
src/
├── App.jsx                       # Main router + auth gate (localStorage-based)
├── App.css                       # CSS variables + auth UI (maroon theme)
├── index.css                     # Global styles (Texas A&M colors)
├── main.jsx                      # React entry point
│
├── components/
│   ├── Layout.jsx                # Role-aware shell (dynamic nav per role)
│   └── Layout.css                # Header (maroon), sidebar, active states
│
└── pages/
    ├── LoginPage.jsx             # Role selector + login (calls onLogin callback)
    ├── RegisterPage.jsx          # Registration (calls onRegister callback)
    │
    ├── StudentDashboard.jsx      # Stats: profile %, resumes, applications
    ├── StudentProfilePage.jsx    # Profile editing
    ├── StudentResumesPage.jsx    # Resume upload/management
    ├── StudentApplicationsPage.jsx # Job application tracking
    │
    ├── JudgeDashboard.jsx        # Active cases, judging assignments
    ├── InstructorDashboard.jsx   # Class stats, student roster
    └── AdminDashboard.jsx        # System overview, user management
```

## Critical Developer Workflows

### Development
```powershell
npm run dev        # Vite dev server with HMR (http://localhost:5173/)
npm run build      # Production build (dist/)
npm run lint       # ESLint check
npm run preview    # Preview built app locally
```

### Backend Integration Points (Ready for Implementation)
- **Auth**: `POST /auth/login`, `POST /auth/register` → store JWT in localStorage
- **Student Data**: `GET /api/student/summary`, `GET /api/student/profile`, etc.
- **Case Competitions**: `GET /api/cases`, `POST /api/cases/:id/scores`
- **Events**: `GET /api/events`, `POST /api/events/:id/register`
- See `BACKEND_INTEGRATION_GUIDE.md` for full API spec and MongoDB schema

## Conventions & Patterns

### Component Structure
- **Functional components** with hooks (React 19)
- **No TypeScript** (yet; see eslint config for TODO on type-aware lint rules)
- **CSS in separate files** (`Layout.css`, `index.css`, `App.css`)—not styled-components or Tailwind
- **Role-aware routes**: Check role in App.jsx before rendering dashboard

### State & Data
- **Mocked data** currently in page components (e.g., `profileCompletion`, `resumeCount` in `StudentDashboard`)
- **localStorage** for auth state: `isLoggedIn`, `userRole` (will upgrade to JWT + context)
- **No central store** yet; TODO: add Context API for global auth + user data
- **axios** is installed but not yet used; will handle API calls

### Navigation
- Use `NavLink` for sidebar navigation (auto `active` class with CSS)
- Use `useNavigate()` hook for programmatic routing (e.g., post-login)
- Dynamic nav items in `Layout.jsx` based on `role` prop
- Default catch-all route redirects based on role

### Auth & Session
```jsx
// Current pattern in App.jsx:
const [isLoggedIn, setIsLoggedIn] = useState(() => 
  localStorage.getItem("isLoggedIn") === "true"
);
const [role, setRole] = useState(() => 
  localStorage.getItem("userRole") || "student"
);

// Login callback from LoginPage:
const handleLogin = (userRole) => {
  setIsLoggedIn(true);
  setRole(userRole.toLowerCase());
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userRole", userRole.toLowerCase());
  // Router auto-redirects based on role
};
```
When implementing real auth, upgrade to JWT tokens + Context API.

## External Dependencies
- **react-router-dom** (v7.9.6): Client-side routing
- **axios** (v1.13.2): HTTP client (prepared, not yet used)
- **vite** (v7.2.4): Build tool with React plugin
- **eslint** (v9.39.1): Linting

## Integration Checklist for New Features
1. Add page component in `pages/` directory
2. Add route to nested `<Route>` in `App.jsx`
3. Add `NavLink` to `Layout.jsx` sidebar (if applicable)
4. Add CSS file if needed; follow `components/Layout.css` structure
5. Replace mocked data with API calls (via axios)
6. Ensure role-based access in `App.jsx` route guards

## Notes
- **No database/backend yet**: Data is mocked; real APIs must be implemented server-side
- **ESLint config** (`eslint.config.js`): Includes React hooks plugin; no TypeScript yet
- **CSS Grid/Flexbox**: Used for layout; see `Layout.css` and `StudentDashboard.jsx` inline styles
- **Multi-role support**: LoginPage handles Student/Judge/Instructor/Admin; only Student routes exist
