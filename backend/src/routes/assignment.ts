import { Router, Request, Response } from 'express';
import Assignment from '../models/Assignment.js';
import { generatePDFBuffer } from '../services/pdf.js';
import { wsManager } from '../services/wsManager.js';
import { generateAssignmentPaper } from '../services/gemini.js';

const router = Router();

// GET all assignments
router.get('/', async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error: any) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET single assignment
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error: any) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET PDF compilation of assignment
router.get('/:id/pdf', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (!assignment.generatedPaper) {
      return res.status(400).json({ message: 'Assignment paper has not been generated yet.' });
    }

    console.log(`Generating PDF for assignment ${assignment._id}...`);
    const pdfBuffer = await generatePDFBuffer(assignment);

    // Set headers for download / viewing in browser
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Assignment-${assignment._id}.pdf"`);
    res.send(pdfBuffer);
  } catch (error: any) {
    console.error('Error compiling PDF:', error);
    res.status(500).json({ message: 'Failed to compile PDF', error: error.message });
  }
});

// POST create new assignment
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, className, subject, dueDate, questionTypes, additionalInfo, language, uploadedFileName, uploadedFileSize } = req.body;

    if (!title || !dueDate || !questionTypes || !Array.isArray(questionTypes)) {
      return res.status(400).json({ message: 'Missing required parameters: title, dueDate, or questionTypes' });
    }

    const now = new Date();
    const assignedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

    const assignment = new Assignment({
      title,
      className: className || 'Class: 8th',
      subject: subject || 'Science',
      assignedDate,
      dueDate,
      status: 'pending',
      progress: 0,
      uploadedFileName,
      uploadedFileSize,
      questionTypes,
      additionalInfo,
    });

    const savedAssignment = await assignment.save();
    
    // Process asynchronously without BullMQ
    const processAssignment = async (assignmentId: string, data: any) => {
      try {
        await Assignment.findByIdAndUpdate(assignmentId, { status: 'generating', progress: 20 });
        wsManager.sendProgress(assignmentId, 20, 'generating');
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await Assignment.findByIdAndUpdate(assignmentId, { progress: 40 });
        wsManager.sendProgress(assignmentId, 40, 'generating');
        
        console.log(`Calling Gemini API for assignment ${assignmentId}...`);
        const generatedPaper = await generateAssignmentPaper(data);
        
        await Assignment.findByIdAndUpdate(assignmentId, { progress: 80 });
        wsManager.sendProgress(assignmentId, 80, 'generating');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const updatedAssignment = await Assignment.findByIdAndUpdate(
          assignmentId,
          { status: 'completed', progress: 100, generatedPaper },
          { new: true }
        );
        console.log(`Successfully completed generation for assignment ${assignmentId}`);
        wsManager.sendJobCompleted(assignmentId, updatedAssignment);
      } catch (error: any) {
        console.error(`Failed to generate paper for assignment ${assignmentId}:`, error);
        await Assignment.findByIdAndUpdate(assignmentId, { status: 'failed', progress: 100 });
        wsManager.sendProgress(assignmentId, 100, 'failed');
      }
    };

    processAssignment(savedAssignment._id.toString(), {
      title,
      className: savedAssignment.className,
      subject: savedAssignment.subject,
      questionTypes,
      additionalInfo,
      language: language || 'English',
    });

    res.status(201).json({
      jobId: savedAssignment._id.toString(),
      assignmentId: savedAssignment._id.toString(),
      _id: savedAssignment._id.toString(),
    });
  } catch (error: any) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// DELETE assignment
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully', id: req.params.id });
  } catch (error: any) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

export default router;
