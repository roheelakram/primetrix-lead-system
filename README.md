# PrimeTrix — Lead Intake, Scoring & Routing System

Built by Roheel for PrimeTrix Builder's Circle evaluation.

## Folder Structure
src/
├── app.js
├── config/scoring.config.js
├── models/lead.model.js
├── routes/lead.routes.js
├── controllers/lead.controller.js
└── services/
    ├── scoring.service.js
    └── routing.service.js

## Setup
1. Clone repo
2. Run: npm install
3. Copy .env.example to .env and add MongoDB URI
4. Run: npm run dev

## API Endpoints
POST  /api/leads      — Create and score lead
GET   /api/leads      — Fetch all leads
GET   /api/leads/:id  — Fetch single lead
PATCH /api/leads/:id  — Update lead status

## Scoring (Max 100 pts)
- Industry match: +25
- Company size 5-50: +20
- Budget 5K+: +25
- Hot intent: +15
- Decision maker: +10
- Tier 1 geography: +5

## Routing
- 75-100 → Client Ready
- 50-74  → Warm Lead
- 25-49  → Nurture
- 0-24   → Disqualified
