# pg_crm

This repository contains a CRM project with a Node/Express backend and a React frontend.

## Live Deployment

- **Backend**: https://pg-crm-backend.onrender.com
- **Frontend**: Deploy the frontend to Render or another static hosting service

## Deploying to Render

The project includes a `render.yaml` manifest for deploying both services to Render.

### Backend
- Service name: `pg-crm-backend`
- Type: `web_service`
- Root: `backend`
- Build command: `npm install`
- Start command: `npm start`

The backend expects environment variables like `MONGODB_URI` if you are connecting to MongoDB in production.

### Frontend
- Service name: `pg-crm-frontend`
- Type: `static_site`
- Root: `frontend`
- Build command: `npm install && npm run build`
- Publish path: `build`

### Deploy steps on Render
1. Push your repo to GitHub.
2. Create a new Render service and connect your repository.
3. Choose `Existing Render.yaml` during service creation.
4. For the backend service, add any required environment variables under the service settings.
5. Deploy.

## Notes
- The frontend is built with Create React App.
- The backend is an Express API server.
- If you need a single Render service instead of two, you can also deploy the frontend as a static site and point it to the backend API URL.