# CMIS-EventConnect: Known Issues & Fixes

## Critical Issues (Must Fix Before Testing)

### 1. ❌ JudgeScoringPage Navigation Bug
**File:** `src/pages/JudgeScoringPage.jsx` (Line ~352)

**Current Code:**
```jsx
button
  onClick={() => navigate(`/judge/students`, { state: { caseId: caseItem.id } })}
```

**Issue:** Route is `/judge/students` but actual route is `/judge/student-profiles`

**Fix:**
```jsx
button
  onClick={() => navigate(`/judge/student-profiles`, { state: { caseId: caseItem.id } })}
```

---

### 2. ❌ JudgeCasesPage "View Teams" Button Navigation
**File:** `src/pages/JudgeCasesPage.jsx` (Line ~225)

**Current Code:**
```jsx
button
  onClick={() => navigate(`/judge/students`, { state: { caseId: caseItem.id } })}
```

**Issue:** Same route issue as above

**Fix:**
```jsx
button
  onClick={() => navigate(`/judge/student-profiles`, { state: { caseId: caseItem.id } })}
```

---

### 3. ⚠️ JudgeScoringPage Score Link Navigation
**File:** `src/pages/JudgeScoringPage.jsx` (Line ~192)

**Current Code:**
```jsx
button
  onClick={() => navigate("/judge/students")}
```

**Issue:** Button says "Back to Students" but route doesn't exist

**Fix:**
```jsx
button
  onClick={() => navigate("/judge/student-profiles")}
```

---

## Non-Critical Issues (Nice-to-Have)

### 4. ℹ️ StudentDashboard "Find Mentors" Button Not Implemented
**File:** `src/pages/StudentDashboard.jsx` (Line ~158)

**Current:** Routes to `/student/mentors` which doesn't exist yet

**Status:** This page hasn't been created. Placeholder OK for now.

---

### 5. ℹ️ State Loss on StudentEventRegistrationPage Navigation
**File:** `src/pages/StudentEventRegistrationPage.jsx`

**Issue:** Switching tabs doesn't persist state when navigating away and back

**Workaround:** Use localStorage or URL query params to save activeTab state:
```jsx
useEffect(() => {
  const saved = localStorage.getItem('eventTab');
  if (saved) setActiveTab(saved);
}, []);

useEffect(() => {
  localStorage.setItem('eventTab', activeTab);
}, [activeTab]);
```

---

### 6. ℹ️ Mock Data Not Dynamic Based on Parameters
**All Pages:** JudgeCasesPage, JudgeStudentProfilesPage, StudentEventRegistrationPage

**Issue:** Route parameters (eventId, caseId) are not used with mock data

**Example - StudentEventRegistrationPage:**
```jsx
// Current: Ignores eventId parameter
const { eventId } = useParams();  // NOT USED
const mockData = { id: 1, ... }  // Always returns case 1

// Should be:
const mockData = caseId === 1 ? CASE_1_DATA : CASE_2_DATA;
```

---

### 7. ✏️ Missing Form Validations
**Files:** All form pages (StudentEventRegistrationPage, JudgeScoringPage)

**TODO:**
- Email validation
- Required field highlighting
- Disable submit while loading
- Clear error states on input change
- Show validation messages

---

## Quick Fix Commands

Run these one at a time to verify each fix:

```bash
# After fixing routes, test navigation:
npm run dev

# Visit http://localhost:5173
# Login as judge
# Navigate: Dashboard → Cases → [View Teams] → Student Profiles
# Should not get route errors
```

---

## Files Modified in This Session

```
✅ src/App.jsx
✅ src/components/Layout.jsx
✅ src/pages/StudentDashboard.jsx
✅ src/pages/StudentEventRegistrationPage.jsx (NEW)
✅ src/pages/JudgeCasesPage.jsx (NEW)
✅ src/pages/JudgeStudentProfilesPage.jsx (NEW)
✅ src/pages/JudgeScoringPage.jsx (NEW)
✅ DEVELOPMENT_PROGRESS.md (NEW)
```

---

## Testing Checklist

Before considering development "complete", verify:

- [ ] All routes load without 404 errors
- [ ] Judge can navigate: Dashboard → Cases → View Teams → Student Profiles → Score Student
- [ ] Student can register for events
- [ ] Scoring form calculates total correctly
- [ ] All navigation buttons route to correct pages
- [ ] Form submissions show success screens
- [ ] Tab switching works smoothly

---

**Priority:** Fix issues #1, #2, and #3 before next session.
**Time Estimate:** 5 minutes to fix all route issues.

Last Updated: December 2025
