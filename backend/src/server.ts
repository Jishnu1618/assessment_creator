import express, { Request, Response } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import url from 'url';

import { connectDB } from './config/db.js';
import { startAssignmentWorker } from './queue/assignmentQueue.js';
import { wsManager } from './services/wsManager.js';
import assignmentRouter from './routes/assignment.js';
import groupsRouter from './routes/groups.js';
import libraryRouter from './routes/library.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Enable CORS so the Next.js frontend can connect
app.use(
  cors({
    origin: '*', // In production, refine to your frontend URL e.g. http://localhost:3000
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Bind HTTP routes
app.use('/api/assignments', assignmentRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/library', libraryRouter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Setup WebSocket server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
  try {
    const parsedUrl = url.parse(req.url || '', true);
    const assignmentId = parsedUrl.query.assignmentId as string;

    if (!assignmentId) {
      console.warn('WebSocket connection attempt failed: missing assignmentId in query params.');
      ws.close(1008, 'assignmentId is required');
      return;
    }

    // Register this websocket connection with the WebSocket Manager
    wsManager.registerClient(assignmentId, ws);

    // Send a welcome connection confirmation
    ws.send(
      JSON.stringify({
        event: 'connected',
        message: `Subscribed to live updates for assignment ${assignmentId}`,
      })
    );
  } catch (error) {
    console.error('Error handling WebSocket connection:', error);
    ws.close(1011, 'Internal Server Error');
  }
});

// Handle upgrade from HTTP server to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
    wss.emit('connection', ws, request);
  });
});

// Bootstrapping the entire application
const startServer = async () => {
  // 1. Connect MongoDB Database
  await connectDB();

  // 2. Start BullMQ Queue worker process
  startAssignmentWorker();

  // 3. Start HTTP + WS Listening Server
  server.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`  EduAi Backend Server running on port ${PORT}`);
    console.log(`  WebSockets available at ws://localhost:${PORT}`);
    console.log(`========================================`);
  });
};

startServer().catch((err) => {
  console.error('Critical failure during server bootstrap:', err);
  process.exit(1);
});
