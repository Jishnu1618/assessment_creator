import express from 'express';
import LibraryItem from '../models/LibraryItem';

const router = express.Router();

// GET all library items
router.get('/', async (req, res) => {
  try {
    const items = await LibraryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch library items' });
  }
});

// POST a new library item
router.post('/', async (req, res) => {
  try {
    const { title, type, subject, size } = req.body;
    const newItem = new LibraryItem({ title, type, subject, size });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create library item' });
  }
});

// DELETE a library item
router.delete('/:id', async (req, res) => {
  try {
    await LibraryItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Library item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete library item' });
  }
});

export default router;
