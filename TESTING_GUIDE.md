# Quick Testing Guide - Judge Feedback System

## 🚀 How to Test the Judge Feedback System

### Prerequisites
- App running: `npm run dev`
- Browser open: `http://localhost:5174` (or your port)
- Browser DevTools ready: `F12`

---

## Step-by-Step Testing

### Test 1: Navigation Flow ✅

**Objective:** Verify judge can navigate from Dashboard → Profiles → Scoring

**Steps:**
1. Login page appears
   - Role selector dropdown
   - Select "Judge" from dropdown
   - Click any password field → all passwords work (mocked)
   - Click Login

2. Judge Dashboard appears
   - Sidebar shows: Dashboard, Student Profiles, Cases
   - Main content shows dashboard stats

3. Click "Student Profiles" in sidebar
   - Page loads with student list
   - Students display in cards
   - Can see: name, email, status, submission status
   - Button says "Score & Feedback"

4. Click "Score & Feedback" button on any student card
   - **EXPECTED:** Navigates to `/judge/score/1` (or student ID)
   - **SHOWS:** Student name in header, team name, form loads
   - **CHECK:** No console errors (F12 → Console tab)

---

### Test 2: Scoring Interface ✅

**Objective:** Test the rubric scoring form works correctly

**Prerequisites:** On scoring page for a student

**Steps:**
1. **View Submission Details Card:**
   - Shows file name
   - Shows upload timestamp
   - Has "Download Submission" link (disabled, ok)

2. **View Score Summary Card:**
   - Shows "0/40" initially
   - Progress bar is empty
   - Rating says "Needs Improvement"

3. **Score the First Criterion (Strategy):**
   - Click score button "8"
   - **EXPECTED:** Button highlights with maroon border
   - Text below shows "Good - Solid strategy with minor gaps"
   - Score summary updates to "8/40"
   - Progress bar fills to ~20%

4. **Score Remaining Criteria:**
   - Market Analysis: Click "8"
   - Presentation: Click "9"
   - Teamwork: Click "7"
   - **CHECK:** Total updates to "32/40"
   - **CHECK:** Progress bar is ~80% full
   - **CHECK:** Rating shows "Good" (32 ≥ 24)

5. **Enter Feedback:**
   - Click in feedback textarea
   - Type: "Good work on analysis. Improve team coordination."
   - **CHECK:** Character counter shows: "65 / 1000"
   - **CHECK:** Feedback persists if you click elsewhere

---

### Test 3: Auto-Save Persistence ✅

**Objective:** Verify scores persist without submission

**Prerequisites:** Scored a student (32/40 example from Test 2)

**Steps:**
1. **Check localStorage:**
   - Open DevTools (F12)
   - Go to Application tab
   - Find localStorage
   - Look for keys:
     - `scores_1` → should show `{"strategy":8,"analysis":8,"presentation":9,"teamwork":7}`
     - `feedback_1` → should show your feedback text
   - **CHECK:** Data is there and correct

2. **Navigate Away:**
   - Click "Student Profiles" in sidebar
   - **CHECK:** Leaves scoring page without error
   - **CHECK:** Previous page shows (no confirmation needed)

3. **Click Score Again on Same Student:**
   - Click "Score & Feedback" on same student
   - **CHECK:** All previous scores are there (8, 8, 9, 7)
   - **CHECK:** Previous feedback text is in textarea
   - **CHECK:** Total score still shows 32/40

4. **Test Browser Refresh:**
   - Press F5 or Ctrl+R to refresh
   - **CHECK:** Page reloads
   - **CHECK:** All scores are still there
   - **CHECK:** Feedback text preserved
   - **CHECK:** No errors

5. **Test Close & Reopen:**
   - Close browser tab
   - Reopen app (http://localhost:5174)
   - Login as Judge again
   - Navigate back to this student
   - **CHECK:** Scores still there
   - **CHECK:** Feedback preserved

---

### Test 4: Submission & Confirmation ✅

**Objective:** Test submission flow and confirmation

**Prerequisites:** Scored student with feedback (Test 2-3)

**Steps:**
1. **Try Submit Without Feedback:**
   - Clear the feedback textarea
   - Try to click "Submit Scoring & Feedback"
   - **EXPECTED:** Alert says "Please provide feedback before submitting."
   - **CHECK:** Form doesn't submit

2. **Add Feedback & Submit:**
   - Type feedback again
   - Click "Submit Scoring & Feedback" button
   - **EXPECTED:** Button shows "Submitting..." briefly
   - **CHECK:** Success screen appears (✅ symbol)
   - **CHECK:** Message says "Scoring Submitted"
   - **CHECK:** Message includes student name
   - **CHECK:** "Back to Students" button visible

3. **Check Submission Saved:**
   - Open DevTools → Application → localStorage
   - Find key: `submission_1`
   - **CHECK:** Should contain:
     - `studentId`: "1"
     - `scores`: { strategy: 8, analysis: 8, ... }
     - `feedback`: your text
     - `totalScore`: 32
     - `submittedAt`: ISO timestamp

4. **Click Back to Students:**
   - Click "Back to Students" button
   - **CHECK:** Returns to student profiles
   - **CHECK:** Same student card now shows:
     - Status badge: "Feedback Given" (instead of "Pending Feedback")
     - Score: "32/40" displayed
     - Button now says: "View Feedback"

---

### Test 5: Filtering & Search ✅

**Objective:** Test student profile filtering

**Prerequisites:** On Student Profiles page

**Steps:**
1. **Search Functionality:**
   - Type "Alex" in search box
   - **CHECK:** List filters to show only "Alex Johnson"
   - Clear search, type "alex.j@"
   - **CHECK:** Filters by email
   - Clear search, type "Team"
   - **CHECK:** Filters by team name

2. **Event Filter:**
   - Use "Filter by Event" dropdown
   - Select "Case Competition 2025"
   - **CHECK:** Shows only students in that event
   - Try other events
   - Select "All Events"
   - **CHECK:** Shows all students

---

### Test 6: Error Cases ✅

**Objective:** Test edge cases and error scenarios

**Steps:**
1. **Score = 0 Submit:**
   - Go to scoring page (don't score anything)
   - Add feedback
   - Try submit
   - **CHECK:** Submit button is disabled (grayed out)
   - **CHECK:** Cannot click it

2. **Different Student ID:**
   - Edit URL: change `/judge/score/1` to `/judge/score/999`
   - **CHECK:** Page still loads
   - **CHECK:** Student name shows "Student" (fallback data)
   - **CHECK:** Can still score and submit

3. **Multiple Students:**
   - Score 3 different students
   - Go back to profiles
   - Click score on 2nd student
   - **CHECK:** See previous scores (not first student's)
   - Submit this one
   - Go back, click score on 1st student again
   - **CHECK:** See that student's scores (correctly separated)

---

## 📊 Test Checklist

### Functionality
- [ ] Can navigate from Dashboard to Scoring
- [ ] Scoring form displays all 4 criteria
- [ ] Can select scores (0, 4, 6, 8, 10)
- [ ] Selected scores highlight
- [ ] Total score calculates correctly
- [ ] Progress bar updates visually
- [ ] Can enter feedback text
- [ ] Character counter works

### Persistence
- [ ] Scores persist after leaving page
- [ ] Scores persist after browser refresh
- [ ] Scores persist after closing browser
- [ ] Feedback text persists
- [ ] localStorage keys are created correctly
- [ ] No duplicate entries in localStorage

### Submission
- [ ] Cannot submit without feedback
- [ ] Cannot submit with totalScore = 0
- [ ] Submission shows success screen
- [ ] Success message includes student name
- [ ] Back to Students button works
- [ ] Student marked as "Feedback Given"

### UI/UX
- [ ] No console errors
- [ ] Page loads quickly
- [ ] Buttons are clickable
- [ ] Gradients display correctly
- [ ] Colors match Texas A&M theme (maroon)
- [ ] Responsive on different screen sizes

---

## 🔍 Debugging Tips

### If Scores Don't Persist:
1. Check if localStorage is enabled
   - DevTools → Application → Storage
   - If disabled, enable it
2. Check if key exists: `scores_${studentId}`
3. Clear localStorage and try fresh: `localStorage.clear()`

### If Navigation Doesn't Work:
1. Check console for errors (F12 → Console)
2. Check route in App.jsx: should be `/judge/score/:studentId`
3. Try clicking the sidebar link instead of button

### If Form Doesn't Submit:
1. Make sure feedback text has content
2. Make sure totalScore > 0
3. Check console for errors
4. Try refreshing page

### Check localStorage Contents:
```javascript
// In browser console (F12 → Console):
// View all keys
Object.keys(localStorage)

// View scores for student 1
JSON.parse(localStorage.getItem('scores_1'))

// View feedback
localStorage.getItem('feedback_1')

// View submission record
JSON.parse(localStorage.getItem('submission_1'))

// Clear all (if needed)
localStorage.clear()
```

---

## ✅ Expected Results Summary

| Test | Status | Evidence |
|------|--------|----------|
| Navigation | ✅ | URL changes to `/judge/score/1` |
| Scoring | ✅ | Total updates, progress bar fills |
| Persistence | ✅ | localStorage keys created |
| Submission | ✅ | Success screen shows |
| Feedback Given | ✅ | Status changes in profile |
| No Errors | ✅ | Console clean |

---

## 🎯 Success Criteria

System is working correctly when:
1. ✅ Judge can navigate to scoring page
2. ✅ Scoring form displays and functions
3. ✅ Scores persist across navigation
4. ✅ Submission shows confirmation
5. ✅ No console errors
6. ✅ localStorage contains submission data

---

**Last Updated:** December 2025  
**Status:** Ready for Testing

