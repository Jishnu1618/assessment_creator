import express, { Request, Response } from 'express';
import Group from '../models/Group.js';

const router = express.Router();

// GET all groups
router.get('/', async (req: Request, res: Response) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

// POST a new group
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, subject, students, color } = req.body;
    const newGroup = new Group({ name, subject, students, color });
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
});

// DELETE a group
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group' });
  }
});

export default router;
