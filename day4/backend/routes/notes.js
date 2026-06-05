const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error); // ← This will show in terminal
    res.status(500).json({ message: error.message });
  }
});

// POST create note
router.post('/', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update note
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE note
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;