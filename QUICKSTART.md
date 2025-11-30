# Quick Start Guide - CMIS EventConnect

## 🚀 Getting Started

### Prerequisites
- Node.js v20.19+ or v22.12+
- npm or yarn
- Git

### Installation
```bash
# Clone repository
cd CMIS-EventConnect

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

## 🧪 Testing the Application

### 1. Login Flow
1. **First Visit**: App redirects to `/login`
2. **Select Role**: Choose from Student, Judge, Instructor, or Admin
3. **Enter Credentials**: Any email/password works (mocked auth)
4. **Land on Dashboard**: Role-specific dashboard loads

### Test Accounts
All of these work with any password:
- **Student**: `student@tamu.edu`
- **Judge**: `judge@exabyte.com`
- **Instructor**: `instructor@tamu.edu`
- **Admin**: `admin@tamu.edu`

### 2. Navigation
Each role has different navigation items in the sidebar:

**Student**:
- Dashboard (home)
- Profile (manage personal info)
- Resumes (upload/manage versions)
- Job Applications (track status)

**Judge**:
- Dashboard (upcoming assignments)
- Cases (view competitions)
- Scoring (submit rubric scores)

**Instructor**:
- Dashboard (class stats)
- Class Management (student rosters)
- Competitions (monitor case competitions)

**Admin**:
- Dashboard (system overview)
- Users (manage all users)
- Analytics (reports & metrics)
- Settings (configuration)

### 3. Color Theme Verification
✅ **Maroon (#500000) elements**:
- Header background
- Active sidebar item
- Button backgrounds
- Headings in cards
- Links and highlights

✅ **White elements**:
- Card backgrounds
- Sidebar background
- Text color
- Form inputs

## 📝 Current State

### What Works ✅
- ✅ Login/Register flow
- ✅ Role-based routing
- ✅ Role-specific dashboards
- ✅ Responsive layout
- ✅ Texas A&M branding (maroon/white)
- ✅ Sidebar navigation
- ✅ Logout functionality
- ✅ Student profile UI
- ✅ Resume management UI
- ✅ Application tracking UI
- ✅ Error handling in forms

### What's Not Yet Implemented ⏳
- ⏳ Real backend authentication
- ⏳ Database persistence
- ⏳ File uploads to storage
- ⏳ API integration
- ⏳ n8n workflows
- ⏳ Email notifications
- ⏳ Analytics/reporting
- ⏳ Permission checks on data

## 🎨 Customization Guide

### Adding a New Route for Students
```jsx
// 1. Create page in src/pages/NewPage.jsx
export default function NewPage() {
  return <div><h1>New Page</h1></div>;
}

// 2. Add route in src/App.jsx
<Route path="new-page" element={<NewPage />} />

// 3. Add nav item in src/components/Layout.jsx
const navItems = {
  student: [
    // ... existing items
    { label: "New Page", path: "/student/new-page" }
  ]
}

// 4. Style with classes from index.css
// Use .card class for card styling
// Use var(--color-maroon) for colors
```

### Changing Colors
All colors are defined in CSS variables at the top of files:

```css
:root {
  --color-maroon: #500000;     /* Primary */
  --color-maroon-dark: #320000; /* Hover */
  --color-bg: #f9fafb;          /* Background */
  --color-border: #e5e7eb;      /* Borders */
}

/* Use throughout as: color: var(--color-maroon); */
```

## 🔌 Backend Integration Steps

### Phase 1: Connect Authentication
1. Create Node.js/Express backend
2. Connect MongoDB
3. Update `LoginPage.jsx` to call `POST /auth/login`
4. Update `RegisterPage.jsx` to call `POST /auth/register`
5. Store JWT token in localStorage

### Phase 2: Fetch Real Data
1. Create MongoDB schemas (see `BACKEND_INTEGRATION_GUIDE.md`)
2. Build API endpoints
3. Update page components to fetch data:
   ```jsx
   useEffect(() => {
     axios.get('/api/student/profile', {
       headers: { Authorization: `Bearer ${token}` }
     }).then(res => setProfile(res.data));
   }, [token]);
   ```

### Phase 3: Add n8n Workflows
1. Set up n8n instance
2. Create workflows for:
   - Welcome emails on registration
   - Case competition reminders
   - Judge assignments
   - Mentor matching
3. Connect via n8n webhooks in backend

## 📁 Project Structure

```
CMIS-EventConnect/
├── src/
│   ├── App.jsx                  # Main router
│   ├── App.css                  # Auth styling
│   ├── index.css                # Global styles
│   ├── main.jsx                 # Entry point
│   │
│   ├── components/
│   │   ├── Layout.jsx           # Shell layout
│   │   └── Layout.css           # Layout styles
│   │
│   └── pages/
│       ├── LoginPage.jsx
│       ├── RegisterPage.jsx
│       ├── StudentDashboard.jsx
│       ├── StudentProfilePage.jsx
│       ├── StudentResumesPage.jsx
│       ├── StudentApplicationsPage.jsx
│       ├── JudgeDashboard.jsx
│       ├── InstructorDashboard.jsx
│       └── AdminDashboard.jsx
│
├── public/
├── .github/
│   └── copilot-instructions.md  # AI agent guidance
│
├── package.json
├── vite.config.js
├── eslint.config.js
│
├── IMPLEMENTATION_SUMMARY.md    # Detailed changes
├── BACKEND_INTEGRATION_GUIDE.md # API & DB schema
└── README.md (original)
```

## 🧭 Developer Workflows

### Running Linter
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```
Output goes to `dist/` folder

### Previewing Production Build
```bash
npm run preview
```

### Development with Hot Reload
```bash
npm run dev
```
Changes auto-reload in browser

## 🐛 Debugging Tips

### Check Browser Console
- Open DevTools (F12)
- Look for errors in Console tab
- Redux/State debugging shown in Network tab

### Check Network Requests
- Network tab shows all API calls (once backend is integrated)
- Look for 401/403 errors (auth issues)
- 500 errors indicate backend problems

### localStorage Contents
```javascript
// In browser console:
console.log(localStorage.getItem('isLoggedIn'));
console.log(localStorage.getItem('userRole'));
```

## 📋 Checklist for Launch

Before deploying to production:
- [ ] Backend authentication working
- [ ] All API endpoints tested
- [ ] MongoDB data persisting correctly
- [ ] File uploads working (resumes)
- [ ] Email notifications configured via n8n
- [ ] Error handling on all forms
- [ ] Responsive design tested on mobile
- [ ] Performance optimized
- [ ] FERPA compliance verified
- [ ] Security audit completed
- [ ] Budget tracking implemented
- [ ] Monitoring/logging set up
- [ ] Documentation complete

## 📞 Common Issues

### "Cannot find module 'react'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 5173 is already in use"
```bash
# Kill existing process or use different port
npm run dev -- --port 3000
```

### Styles not applying
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file imports in components
- Verify CSS variables are defined

### Routes not working
- Check URL matches path in `App.jsx`
- Verify `<Outlet />` is in parent Layout
- Check role matches selected role

## 🎓 Learning Resources

- [React Hooks Docs](https://react.dev/reference/react)
- [React Router v7 Guide](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [CSS Grid & Flexbox](https://web.dev/learn/css/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 📞 Support

For implementation details, see:
- **Architecture**: `.github/copilot-instructions.md`
- **Backend Setup**: `BACKEND_INTEGRATION_GUIDE.md`
- **Changes Made**: `IMPLEMENTATION_SUMMARY.md`

---

**Happy Coding! 🎉**

*Last Updated: November 30, 2025*
