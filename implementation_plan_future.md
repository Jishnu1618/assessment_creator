# Implementation Plan: Multi-Agent Self-Reflection (Critic) Loop

Introduce a cooperative **Multi-Agent Self-Reflection (Critic) Loop** in the backend using the existing Google Gemini API, and stream actual, real-time agentic progress logs to the frontend via WebSockets.

---

## Proposed Roadmap & Phases

To make the learning curve manageable and guarantee progress, we will split the development into focused phases. This plan covers **Phase 1**, which requires **zero external database dependencies** and utilizes the Gemini SDK already in place.

* **Phase 1 [CURRENT PLAN]**: Multi-Agent Self-Reflection Loop & Dynamic WebSocket Status Logs.
* **Phase 2 [FUTURE]**: Retrieval-Augmented Generation (RAG) with local ChromaDB to ingest textbooks.
* **Phase 3 [FUTURE]**: Sandboxed code execution tool for math & programming answer validation.

---

## User Review Required

> [!IMPORTANT]
> **Dynamic Progress updates**: We will replace the mock `setTimeout` delays in the backend router/queue worker with **actual** progress hooks. This means the frontend spinner will reflect exactly which agent is running at that millisecond!

---

## Proposed Changes

### 1. Backend Service Layer

#### [MODIFY] [gemini.ts](file:///E:/vedaai/backend/src/services/gemini.ts)
* Define a new JSON schema `criticSchema` for the Critic Agent's output:
  ```typescript
  type CriticOutput = {
    score: number;      // 0 to 100
    approved: boolean;  // True if score >= 85
    feedback: string;   // List of recommended corrections/improvements
  }
  ```
* Implement `criticReviewPaper(draftPaper, originalParams)`: A function that feeds the generated question paper back to Gemini under a "Critic Agent" role to evaluate clarity, difficulty, and rubric correctness.
* Implement `revisePaper(draftPaper, feedback, originalParams)`: A function that acts as a "Revision Agent," taking the draft, the critic's critiques, and instructions, to compile the final polished exam.
* Update `generateAssignmentPaper` to accept a callback: `onProgress: (status: string, percentage: number) => void`. Inside, run the agents sequentially and trigger progress updates.

---

### 2. Backend Job Processor & Router

#### [MODIFY] [assignment.ts](file:///E:/vedaai/backend/src/routes/assignment.ts)
* Update `processAssignment` to hook the dynamic `onProgress` callback directly into `generateAssignmentPaper`.
* Replace the hardcoded `setTimeout` mocks with real-time websocket progress triggers:
  ```typescript
  const generatedPaper = await generateAssignmentPaper({
    ...data,
    onProgress: (status, percentage) => {
      wsManager.sendProgress(assignmentId, percentage, 'generating', status);
    }
  });
  ```

#### [MODIFY] [assignmentQueue.ts](file:///E:/vedaai/backend/src/queue/assignmentQueue.ts)
* Implement the identical `onProgress` handler inside the BullMQ worker task processor to ensure both queue-based and queue-bypassed pathways run the same agentic flow.

---

### 3. Frontend Real-time Progress Display

#### [MODIFY] [useStore.ts](file:///E:/vedaai/frontend/src/store/useStore.ts)
* Update the Zustand WebSocket handler to capture the newly added `status` string from the WebSocket server payload and store it in state as `generationStatusText`.

#### [MODIFY] [create/page.tsx](file:///E:/vedaai/frontend/src/app/create/page.tsx)
* Replace the generic loader messages with the dynamic `generationStatusText` coming from the server, making the agentic loop visible to the user:
  * *`[Drafting Agent] Drafting 5 questions...`*
  * *`[Critic Agent] Evaluating difficulty and Bloom's taxonomy...`*
  * *`[Revision Agent] Refining layouts based on feedback...`*

---

## Verification Plan

### Manual Verification
1. Start the backend: `npm run dev` in `/backend`.
2. Start the frontend: `npm run dev` in `/frontend`.
3. Open `http://localhost:3000` in browser.
4. Go to **Create Assignment**, specify topics, and click **Generate**.
5. **Verify Spinner Logs**: Confirm the screen progress text dynamically changes according to which agent is active, rather than using a static percentage delay.
6. **Verify Database Records**: Confirm the final compiled paper is correctly saved in MongoDB.
