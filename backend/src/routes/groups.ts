import express from 'express';
import Group from '../models/Group';

const router = express.Router();

// GET all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

// POST a new group
router.post('/', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group' });
  }
});

export default router;
