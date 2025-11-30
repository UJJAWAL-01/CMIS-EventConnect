# CMIS Case Competition 2025 - Platform Requirements

## Competition Overview

**Event**: CMIS Case Competition 2025: "Thriving in an AI World"  
**Date**: December 5, 2025, 9:00 AM - 2:00 PM  
**Location**: Mays Business School, Texas A&M University  
**Organizers**: Dr. David Gomillion & Dr. Dwayne Whitten

## Challenge Statement

CMIS (Council for Management of Information Systems) is a non-profit engagement platform connecting students, alumni, industry partners, and faculty. Currently managing registration and coordination through:
- Google Forms (registrations)
- Spreadsheets (student data & resumes)
- SurveyMonkey (judging scores)
- Email threads (speaker schedules & mentor matches)

**Problem**: This ad-hoc patchwork creates inefficiencies, missing registrations, difficulty accessing student information, and limited engagement analytics.

**Your Task**: Build a centralized digital engagement platform that improves stakeholder connection using AI for personalized communication and automation via n8n.

## Key Scoring Rubric (100 points)

### I. Solution Implementation & Demo (40 Points)
**Does it work?**
- 0-15: Concept only / Broken demo
- 16-30: Partial functionality (UI exists, backend missing)
- **31-40**: ✅ **Functional prototype** with working data flow

### II. Business Value: Stakeholder Engagement (30 Points)
**Does it connect people?**
- 0-10: Administrative CRUD (just stores data)
- 11-20: Passive connection (users search, but system doesn't help)
- **21-30**: ✅ **Active engagement** ecosystem (system identifies opportunities and facilitates connections)

### III. Architecture, Automation & AI Personality (20 Points)
**Is it sustainable and "human"?**
- 0-5: Robotic, manual workflows
- 6-15: Standard mail merges (functional but lacks nuance)
- **16-20**: ✅ **Intelligent & personalized** (AWS/n8n, generative AI for human-sounding comms)

### IV. Presentation & Q&A (10 Points)
**Professionalism**
- 0-3: Unprepared
- 4-7: Adequate
- **8-10**: ✅ **Executive presence** (compelling, professional, confident Q&A)

## Core Philosophy: "Engagement is Everything"

❌ **Don't think of this as**:
- An "event tracker" or database
- A form submission system
- A resume repository

✅ **Think of this as**:
- A tool that **connects** Students ↔ Alumni ↔ Industry
- A system that **identifies opportunities** (e.g., "Alumni X works in Cyber Security—mentor Student Y?")
- A platform that **facilitates relationships** seamlessly

## Platform Requirements (by Priority)

### HIGHEST PRIORITY

#### 1. Student Career Portal
**Who**: Students, Recruiters, Faculty  
**What**:
- Resume repository with version history
- Skill tagging & search
- Job application status tracking
- Profile completion percentage

**Why Important**: Recruiters want one place to find students; students want central profile

#### 2. Event Management System
**Who**: Students, Instructors, Admins  
**What**:
- Online registration with confirmations
- Waitlist management
- Feedback forms post-event
- Attendance tracking

**Why Important**: Replace fragmented Google Forms + spreadsheets

#### 3. Case Competition Platform
**Who**: Students, Faculty, Judges, Admins  
**What**:
- Team registration & submissions
- Judge scheduling
- Rubric-based scoring (Implementation, Business Value, Automation, Presentation)
- Structured feedback to teams
- Results & rankings

**Why Important**: Core CMIS activity; needs transparent, auditable process

### SECONDARY PRIORITY

#### 4. Industry Speaker Exchange
**Sponsors get tiered access** (ExaByte > PetaByte > TeraByte)

#### 5. Mentorship Marketplace
- Matching algorithm (skills/interests)
- Meeting cadence suggestions
- Recognition system
- Messaging/scheduling

## Special Requirements (Dr. Met Richards, Info Department)

📋 **Graduate Assistant Monitoring**
- Hire 20 hrs/week graduate assistant @ $25/hr
- Monitor 1 in 10 database entries for accuracy
- Role: HITL (Human-in-the-Loop) validation
- Track validation results in database

📊 **Weekly Reports**
- Email weekly impact reports to Dr. Richards
- Include: user registrations, event attendance, submissions
- Breakdown by stakeholder type (student, alumni, industry, faculty)

💰 **Budget Constraint**
- **Minimum**: $1,000,000 (ASAD grant must be fully deployed)
- **Maximum**: $2,000,000
- Must include GA salary, AWS hosting, n8n licenses, tools
- Dr. Richards focuses **ONLY** on budget; doesn't care about other metrics

## Technology Stack Recommendations

### Frontend (Implemented)
✅ React 19 + Vite  
✅ React Router v7  
✅ Texas A&M Branding (Maroon #500000 + White)  

### Backend (To Be Implemented)
⏳ Node.js + Express  
⏳ MongoDB (BSON documents)  
⏳ JWT authentication  

### Automation (To Be Integrated)
⏳ **n8n** for workflow orchestration:
  - Welcome emails on registration
  - Competition reminders 24h before
  - Mentor matching & outreach
  - Judge assignment notifications
  - Automated thank-you emails post-event

### Cloud Infrastructure
⏳ **AWS** (per curriculum):
  - EC2 or Lambda (backend compute)
  - S3 (resume file storage)
  - RDS or DocumentDB (MongoDB database)
  - CloudWatch (monitoring & logging)
  - SNS/SES (email notifications)

## Example Workflows (n8n)

### Workflow 1: Welcome Email on Registration
```
User registers → MongoDB create user → Generative AI personalize email 
→ Send via AWS SES → Log to analytics
```

Example AI-generated email:
> "Hi Sarah! 🎓  
> Welcome to CMIS EventConnect. We noticed you're interested in Cloud Computing. 
> Did you know that **3 of our industry mentors** also specialize in this area? 
> Check your mentorship opportunities → [link]"

### Workflow 2: Mentor Matching
```
New mentorship request → Query alumni by skills/company 
→ Find top 3 matches → AI draft personalized outreach email 
→ Send to mentor + add to follow-up queue
```

### Workflow 3: Case Competition Reminder
```
Every morning → Query competitions < 24 hours away 
→ Get registered teams → Send reminders to ALL members 
→ Include link to submission portal + Q&A doc
```

## Evaluation Criteria (Final Round - Audience Voting)

Audience members vote on each team (1-10 scale) across:

1. **User Experience (UX)**: Is it intuitive and visually appealing?
2. **Stakeholder Engagement**: Does it actually bring people together or just store data?
3. **AI & Human Communication**: Did you use generative AI to make emails personal, not robotic?
4. **Feasibility & Sustainability**: Can a student worker maintain it? Did you use AWS/n8n?
5. **Presentation Quality**: Was the pitch professional and engaging?

## Budget Example (For Reference)

| Item | Cost | Notes |
|------|------|-------|
| AWS Compute (EC2/Lambda) | $150,000/year | Development + staging + production |
| MongoDB Atlas | $100,000/year | Database hosting |
| n8n Instance | $200,000/year | Workflow automation platform |
| AWS Storage (S3 for resumes) | $50,000/year | File storage & bandwidth |
| Graduate Assistant (20 hrs × $25 × 52 weeks) | $26,000/year | HITL validation |
| Monitoring & Logging Tools | $50,000/year | CloudWatch, Datadog, etc. |
| Team & Development | $200,000/year | Ongoing maintenance |
| **Total Year 1** | **~$776,000** | Well under $2M |

---

**Remember**: The judges want to see a **working system** that **actively brings people together** using **AI for genuine personalization**. Focus on engagement over features. Show a live demo. Answer Q&A confidently.

**Good luck! 🐴 Gig 'em Aggies!**
