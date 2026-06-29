import { WebSocket } from 'ws';

class WebSocketManager {
  private clients = new Map<string, WebSocket>(); // assignmentId -> ws client

  public registerClient(assignmentId: string, ws: WebSocket) {
    this.clients.set(assignmentId, ws);
    console.log(`Registered WebSocket client for assignment ${assignmentId}`);
    
    ws.on('close', () => {
      this.clients.delete(assignmentId);
      console.log(`Unregistered WebSocket client for assignment ${assignmentId}`);
    });
  }

  /** Emit an intermediate progress update to the subscribed client */
  public sendProgress(assignmentId: string, progress: number, status: string, message?: string, data?: any) {
    const ws = this.clients.get(assignmentId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ event: 'progress', assignmentId, progress, status, message, data }));
    }
  }

  /**
   * Emit the final "job:completed" event with the fully-generated assignment payload.
   * Frontend listens for this to fetch /api/assignments/:id and render the output.
   */
  public sendJobCompleted(assignmentId: string, data: any) {
    const ws = this.clients.get(assignmentId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ event: 'job:completed', assignmentId, data }));
      console.log(`Emitted "job:completed" for assignment ${assignmentId}`);
    }
  }
}

export const wsManager = new WebSocketManager();
