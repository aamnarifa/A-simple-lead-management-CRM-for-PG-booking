# Lead Management CRM for PG Booking

## Overview

Lead Management CRM for PG Booking is a full-stack CRM built to manage PG booking inquiries from first contact to final conversion. It helps operations teams track leads through inquiry, contact, visit scheduling, and booking outcomes.

This project is built as an MVP for internal sales and operations workflows.

## Features

- Add and manage PG booking leads
- Assign leads to agents
- Track pipeline stages: New, Contacted, Visit Scheduled, Converted, Lost
- Schedule visits for interested leads
- Dashboard with lead metrics and conversion insights
- Real-time state updates across Dashboard, Leads Table, and Pipeline views

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Deployment: Render

## Project Structure

```text
root/
  backend/
    src/
      controllers/
      routes/
      models/
    server.js
  frontend/
    src/
      components/
      pages/
  README.md
```

## Key Design Decisions

- Centralized lead update logic in the backend
- Strict status and visit date consistency rules
- Single source of truth for lead state in the frontend
- Simple folder structure that can scale with more CRM modules

## API Endpoints

- `GET /leads` - Fetch all leads
- `POST /leads` - Create a new lead
- `PATCH /leads/:id` - Update lead status, owner, or visit date

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create a `.env` file in the backend folder for local development.

```env
MONGO_URI=your_mongodb_connection_string
PORT=your_backend_port
```

For the frontend, use environment variables when pointing the app to a deployed backend API.

```env
REACT_APP_API_URL=your_backend_api_url
```

Do not commit real environment variable values to version control.

## Live Demo

https://pg-crm-frontend.onrender.com

## Future Improvements

- Authentication
- Property/PG management
- Notifications
- Better analytics

## Author

Aamna Rifa
