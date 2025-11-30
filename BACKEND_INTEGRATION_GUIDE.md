# Backend Integration Guide - n8n & MongoDB

## Architecture Overview

This document outlines how to integrate the CMIS EventConnect frontend with n8n automation workflows and MongoDB for data persistence.

## Database Schema (MongoDB)

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,        // netid@tamu.edu
  password: String,     // hashed
  role: String,         // "student", "judge", "instructor", "admin"
  fullName: String,
  createdAt: Date,
  updatedAt: Date,
  
  // Role-specific fields
  studentId: String,    // UIN for students
  organization: String, // For judges/industry
  title: String,        // Job title for judges
  
  // Status
  isActive: Boolean,
  lastLogin: Date
}
```

#### Student Profiles Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,     // Reference to Users
  profileCompletion: Number, // 0-100
  major: String,
  graduationYear: String,
  linkedinUrl: String,
  headline: String,
  skills: [String],     // ["Python", "SQL", "AWS"]
  
  // Resume tracking
  resumes: [
    {
      id: String,
      fileName: String,
      uploadDate: Date,
      isDefault: Boolean,
      fileUrl: String    // S3 URL
    }
  ],
  
  // Application tracking
  applications: [
    {
      id: String,
      company: String,
      role: String,
      status: String,    // "Applied", "Interviewing", "Offer", "Rejected"
      appliedDate: Date
    }
  ]
}
```

#### Case Competitions Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String,       // "Registration", "Submissions", "Judging", "Finals", "Completed"
  round: String,        // "Preliminary", "Final"
  
  // Teams
  teams: [
    {
      id: String,
      name: String,
      members: [ObjectId], // References to Users
      submission: {
        submittedAt: Date,
        documentUrl: String,
        slides: String
      }
    }
  ],
  
  // Judging
  judges: [
    {
      judgeId: ObjectId,
      assignments: [String] // Team IDs assigned
    }
  ],
  
  scores: [
    {
      teamId: String,
      judgeId: ObjectId,
      implementation: Number,
      businessValue: Number,
      automation: Number,
      presentation: Number,
      comments: String,
      submittedAt: Date
    }
  ],
  
  dates: {
    registrationOpen: Date,
    registrationClose: Date,
    submissionDeadline: Date,
    preliminaryDate: Date,
    finalDate: Date
  }
}
```

#### Events Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  type: String,        // "Workshop", "Career Fair", "Guest Speaker", "Networking"
  
  eventDate: Date,
  endDate: Date,
  location: String,
  
  // Registration
  registrationOpen: Date,
  registrationClose: Date,
  maxAttendees: Number,
  registeredUsers: [
    {
      userId: ObjectId,
      registeredAt: Date,
      attended: Boolean,
      feedback: String
    }
  ],
  
  // Metadata
  createdBy: ObjectId,  // Admin/Instructor
  createdAt: Date
}
```

## API Endpoints

### Authentication
```
POST /auth/register
  Body: { email, password, fullName, role, studentId?, organization?, title? }
  Returns: { token, role, userId }

POST /auth/login
  Body: { email, password, role }
  Returns: { token, role, userId }

POST /auth/logout
  Headers: { Authorization: "Bearer <token>" }
  Returns: { success: true }
```

### Student Routes
```
GET /api/student/summary
  Returns: { profileCompletion, resumeCount, applications: { applied, interviewing, offer, rejected } }

GET /api/student/profile
  Returns: Student profile object

POST /api/student/profile
  Body: { major, graduationYear, linkedinUrl, headline, skills }
  Returns: Updated profile

GET /api/student/resumes
  Returns: [{ id, fileName, uploadDate, isDefault }]

POST /api/student/resumes
  Body: FormData with file
  Returns: { id, fileName, uploadDate }

DELETE /api/student/resumes/:id
  Returns: { success: true }

PATCH /api/student/resumes/:id/default
  Returns: Updated resume list

GET /api/student/applications
  Returns: [{ id, company, role, status, appliedDate }]

POST /api/student/applications
  Body: { company, role, status, appliedDate }
  Returns: Created application

PUT /api/student/applications/:id
  Body: Partial application object
  Returns: Updated application

DELETE /api/student/applications/:id
  Returns: { success: true }
```

### Case Competition Routes
```
GET /api/cases
  Returns: [{ title, status, round, teams, dates }]

POST /api/cases/:caseId/teams
  Body: { name, members: [userId] }
  Returns: Created team

POST /api/cases/:caseId/teams/:teamId/submit
  Body: FormData with submission files
  Returns: { submittedAt, documentUrl }

GET /api/cases/:caseId/scoring
  Returns: Rubric and scoring interface

POST /api/cases/:caseId/scores
  Body: { teamId, judgeId, implementation, businessValue, automation, presentation, comments }
  Returns: Saved score

GET /api/cases/:caseId/results
  Returns: Final rankings and winners
```

### Judge Routes
```
GET /api/judge/assignments
  Returns: [{ caseId, round, teams, dueDate }]

GET /api/judge/scores/:caseId
  Returns: Judge's submitted scores

POST /api/judge/scores/:caseId/:teamId
  Body: { implementation, businessValue, automation, presentation, comments }
  Returns: Saved score
```

### Events Routes
```
GET /api/events
  Returns: [{ id, title, eventDate, registeredCount, maxAttendees }]

GET /api/events/:eventId
  Returns: Full event details

POST /api/events/:eventId/register
  Returns: { registered: true, confirmationNumber }

DELETE /api/events/:eventId/register
  Returns: { unregistered: true }

POST /api/events/:eventId/feedback
  Body: { rating, comments, attended }
  Returns: Saved feedback
```

## n8n Workflows

### 1. Welcome Email Workflow
**Trigger**: User registers  
**Steps**:
1. Webhook receives registration data
2. User created in MongoDB
3. Send personalized welcome email via SMTP
4. Log activity to analytics

### 2. Competition Reminder Workflow
**Trigger**: Scheduled (daily)  
**Steps**:
1. Query MongoDB for upcoming case competitions
2. Find registered teams
3. Send reminders to team members 24 hours before preliminary round
4. Update reminder status

### 3. Mentor Matching Workflow
**Trigger**: New mentorship request  
**Steps**:
1. Get student profile (skills, interests)
2. Query alumni database for matching mentors
3. Create personalized outreach email
4. Send to potential mentor
5. Log match attempt

### 4. Job Application Notification
**Trigger**: Student updates application status to "Offer"  
**Steps**:
1. Get student info
2. Send congratulations email
3. Notify relevant instructors/admins
4. Add to success stories queue

### 5. Judge Assignment Notification
**Trigger**: Admin assigns judge to case competition  
**Steps**:
1. Get judge details
2. Get case/team information
3. Send assignment details email
4. Create calendar invite
5. Send reminder 24 hours before

### Example n8n Workflow Configuration

```json
{
  "name": "Student Registration Workflow",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "method": "POST",
      "path": "student-registration"
    },
    {
      "name": "MongoDB Create User",
      "type": "n8n-nodes-base.mongodb",
      "operation": "insert",
      "collection": "users"
    },
    {
      "name": "Create Student Profile",
      "type": "n8n-nodes-base.mongodb",
      "operation": "insert",
      "collection": "student_profiles"
    },
    {
      "name": "Send Welcome Email",
      "type": "n8n-nodes-base.sendGrid",
      "template": "welcome-email",
      "to": "{{ $node.Webhook.json.email }}"
    }
  ],
  "connections": {
    "Webhook": ["MongoDB Create User"],
    "MongoDB Create User": ["Create Student Profile"],
    "Create Student Profile": ["Send Welcome Email"]
  }
}
```

## Setup Steps

### 1. Backend Server (Node.js/Express)
```bash
# Create backend project
mkdir cmis-backend
cd cmis-backend
npm init -y
npm install express mongoose bcrypt jsonwebtoken cors axios dotenv

# Create .env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cmis
JWT_SECRET=your_jwt_secret
N8N_WEBHOOK_URL=https://n8n.your-domain.com/webhook
```

### 2. MongoDB Setup
```javascript
// config/db.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### 3. n8n Integration
```javascript
// utils/n8n.js
const axios = require('axios');

async function triggerWorkflow(workflowId, data) {
  try {
    await axios.post(
      `https://n8n.your-domain.com/webhook/cmis-${workflowId}`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${process.env.N8N_API_KEY}`
        }
      }
    );
  } catch (error) {
    console.error('Workflow trigger failed:', error);
  }
}

module.exports = { triggerWorkflow };
```

### 4. Authentication Endpoint Example
```javascript
// routes/auth.js
router.post('/register', async (req, res) => {
  const { email, password, fullName, role, studentId } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user in MongoDB
  const user = new User({
    email, password: hashedPassword, fullName, role, studentId
  });
  await user.save();
  
  // Create JWT token
  const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET);
  
  // Trigger n8n workflow for welcome email
  await triggerWorkflow('registration', { email, fullName });
  
  res.json({ token, role, userId: user._id });
});
```

## Deployment Considerations

### Dr. Met Richards Requirements
- **Graduate Assistant**: 20 hrs/week @ $25/hr for HITL monitoring (1 in 10 entries)
  - MongoDB collection: `validation_queue`
  - n8n workflow to sample 10% of entries for review
  - Approval/rejection updates source record

- **Weekly Reports**: Generate via n8n scheduled job
  - Query MongoDB for usage stats
  - Calculate costs
  - Email report to Dr. Richards

- **Budget Tracking**: $1,000,000 - $2,000,000
  - AWS costs (compute, storage, data transfer)
  - n8n hosting/licenses
  - MongoDB Atlas subscription
  - GA assistant salary ($520/week)

## Testing the Integration

```bash
# Test API endpoints
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@tamu.edu",
    "password": "test123",
    "fullName": "Test Student",
    "role": "student"
  }'

# Verify MongoDB record
db.users.findOne({ email: "student@tamu.edu" })

# Check n8n workflow execution
# Visit n8n UI → Executions tab
```

## References
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [n8n Documentation](https://docs.n8n.io/)
- [Express.js Guide](https://expressjs.com/)
- [JWT Authentication](https://jwt.io/)
