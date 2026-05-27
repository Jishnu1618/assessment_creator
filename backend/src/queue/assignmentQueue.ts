import { Queue, Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import Assignment from '../models/Assignment.js';
import { generateAssignmentPaper } from '../services/gemini.js';
import { wsManager } from '../services/wsManager.js';

const QUEUE_NAME = 'assignmentQueue';

// Create the BullMQ Queue
export const assignmentQueue = new Queue(QUEUE_NAME, {
  connection: redisConnection as any,
});

console.log(`BullMQ Queue "${QUEUE_NAME}" initialized.`);

// Create the Worker
export const startAssignmentWorker = () => {
  const worker = new Worker(
    QUEUE_NAME,
    async (job: Job) => {
      const { assignmentId, title, className, subject, questionTypes, additionalInfo } = job.data;
      console.log(`Processing job ${job.id} for assignment ${assignmentId}`);

      try {
        // 1. Update assignment to "generating" and 20% progress
        await Assignment.findByIdAndUpdate(assignmentId, {
          status: 'generating',
          progress: 20,
        });
        wsManager.sendProgress(assignmentId, 20, 'generating');

        // 2. Mock some progress/delays to feel premium and realistic
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await Assignment.findByIdAndUpdate(assignmentId, { progress: 40 });
        wsManager.sendProgress(assignmentId, 40, 'generating');

        // 3. Invoke Gemini AI Generation
        console.log(`Calling Gemini API for assignment ${assignmentId}...`);
        const generatedPaper = await generateAssignmentPaper({
          title,
          className,
          subject,
          questionTypes,
          additionalInfo,
        });

        // 4. Intermediate progress update (80%)
        await Assignment.findByIdAndUpdate(assignmentId, { progress: 80 });
        wsManager.sendProgress(assignmentId, 80, 'generating');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 5. Complete task
        const updatedAssignment = await Assignment.findByIdAndUpdate(
          assignmentId,
          {
            status: 'completed',
            progress: 100,
            generatedPaper,
          },
          { new: true }
        );

        console.log(`Successfully completed generation for assignment ${assignmentId}`);

        // 6. Cache result in Redis (key: result:{assignmentId}, TTL: 1 hour)
        try {
          await redisConnection.set(
            `result:${assignmentId}`,
            JSON.stringify(updatedAssignment),
            'EX',
            3600 // 1 hour TTL
          );
          console.log(`Cached result for assignment ${assignmentId} in Redis.`);
        } catch (cacheError) {
          console.warn(`Failed to cache result in Redis for ${assignmentId}:`, cacheError);
        }

        // 7. Emit "job:completed" WebSocket event to frontend
        wsManager.sendJobCompleted(assignmentId, updatedAssignment);
        
        return updatedAssignment;
      } catch (error: any) {
        console.error(`Failed to generate paper for assignment ${assignmentId}:`, error);

        await Assignment.findByIdAndUpdate(assignmentId, {
          status: 'failed',
          progress: 100, // or keep last progress
        });
        wsManager.sendProgress(assignmentId, 100, 'failed');

        throw error;
      }
    },
    {
      connection: redisConnection as any,
      concurrency: 2, // process up to 2 papers concurrently
    }
  );

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully.`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err);
  });

  console.log(`BullMQ Worker for queue "${QUEUE_NAME}" started.`);
};
