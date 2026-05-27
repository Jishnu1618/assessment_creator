# 📋 Project Software & API Requirements

This document outlines the system dependencies, API contracts, environment configurations, and external integrations required to run the VedaAI platform.

---

## 🛠️ System Prerequisites

Ensure the following environments are installed and configured on your machine:
* **Node.js**: `v18.0.0` or higher (Recommended: `v20.x` LTS)
* **npm**: `v9.0.0` or higher (Bundled with Node.js)
* **MongoDB**: A running local MongoDB community instance OR a cloud cluster on **MongoDB Atlas** (Free tier M0 is sufficient).
* **Gemini API Access**: An active API Key from the Google AI Studio developer console.

---

## 🔑 Environment Variables Configuration

Both the frontend and backend utilize environment configurations. Copy the templates below to your local environment configuration.

### 1. Backend Service (`backend/.env`)
Create a file named `.env` in the `backend/` directory:
```env
# Server Port Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (MongoDB Atlas Connection String)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name>?retryWrites=true&w=majority

# Gemini API Integration (CRITICAL: Get a key from https://aistudio.google.com/)
GEMINI_API_KEY=AIzaSy...

# Optional Task Queue Configuration (BullMQ Redis Broker)
# Note: VedaAI features a resilient Redis-bypass fallback. 
# If left blank, generations will process inline seamlessly!
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```

### 2. Frontend Client (`frontend/.env.local` or environment variables)
Create a file named `.env.local` in the `frontend/` directory (Optional, defaults to local port `5000` in state stores):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🛰️ API Endpoint Contracts

### 1. Create Assignment (`POST /api/assignments`)
Used to submit assignment metadata and trigger the Gemini AI question generation pipeline.

* **Headers**: `Content-Type: application/json`
* **Payload Schema**:
```json
{
  "title": "Quiz on Photosynthesis",
  "className": "Class: 9th",
  "subject": "Biology",
  "dueDate": "28-05-2026",
  "language": "English",
  "questionTypes": [
    {
      "id": "1",
      "type": "Multiple Choice Questions",
      "count": 4,
      "marks": 1
    },
    {
      "id": "2",
      "type": "Short Questions",
      "count": 3,
      "marks": 2
    }
  ],
  "additionalInfo": "Focus on light and dark reactions, Calvin cycle, and chloroplast structure.",
  "uploadedFileName": "photosynthesis_syllabus.pdf",
  "uploadedFileSize": "1.24 MB"
}
```

* **Success Response (`201 Created`)**:
```json
{
  "jobId": "65b9c1d2e4b06f23c0a1b2c3",
  "assignmentId": "65b9c1d2e4b06f23c0a1b2c3",
  "_id": "65b9c1d2e4b06f23c0a1b2c3"
}
```

---

## ⚡ WebSockets Progress Event Contracts

The client connects to `ws://localhost:5000?assignmentId=<id>` to stream real-time progress.

### 1. Connection Established Event
* **Payload**:
```json
{
  "event": "connected",
  "message": "Subscribed to live updates for assignment 65b9c1..."
}
```

### 2. Generation Step Progress Update
* **Payload**:
```json
{
  "event": "progress",
  "progress": 40,
  "status": "generating"
}
```

### 3. Generation Completed Event
* **Payload**:
```json
{
  "event": "completed",
  "status": "completed",
  "data": {
    "_id": "65b9c...",
    "title": "Quiz on Photosynthesis",
    "status": "completed",
    "generatedPaper": {
      "schoolName": "Delhi Public School, Sector-4, Bokaro",
      "subject": "Biology",
      "className": "Class: 9th",
      "timeAllowed": "45 minutes",
      "maxMarks": 10,
      "instructions": "All questions are compulsory...",
      "questions": [...],
      "answers": [...]
    }
  }
}
```
