const Note = require('../models/Note');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    let notes;

    // Check if user is Admin or Manager
    const isManagerOrAdmin = req.roles.includes('Manager') || req.roles.includes('Admin');

    if (isManagerOrAdmin) {
        // Fetch all notes
        notes = await Note.find().lean();
    } else {
        // Fetch only notes assigned to the logged-in user
        notes = await Note.find({ user: req.userId }).lean();
    }

    if (!notes?.length) {
        return res.status(200).json([]);
    }

    // Add username and map ID to note objects before sending response
    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec();
        return {
            ...note,
            id: note._id,
            username: user?.username || 'Unknown User'
        };
    }));

    res.json(notesWithUser);
});

// @desc Create a note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the assigned user exists
    const userExists = await User.findById(user).lean().exec();
    if (!userExists) {
        return res.status(400).json({ message: 'Assigned user does not exist' });
    }

    const noteObject = { user, title, text };

    const note = await Note.create(noteObject);

    if (note) {
        res.status(201).json({ message: 'New note created successfully' });
    } else {
        res.status(400).json({ message: 'Invalid note data received' });
    }
});

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const note = await Note.findById(id).exec();
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    // Role check: Employees can only edit their own notes and cannot reassign them
    const isManagerOrAdmin = req.roles.includes('Manager') || req.roles.includes('Admin');
    if (!isManagerOrAdmin) {
        if (note.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Forbidden: You can only edit your own notes' });
        }
        if (note.user.toString() !== user) {
            return res.status(403).json({ message: 'Forbidden: Employees cannot reassign notes' });
        }
    }

    // Check if the assigned user exists
    const userExists = await User.findById(user).lean().exec();
    if (!userExists) {
        return res.status(400).json({ message: 'Assigned user does not exist' });
    }

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();

    res.json({ message: `Note '${updatedNote.title}' updated` });
});

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Note ID required' });
    }

    // Role check: Only Managers and Admins can delete notes
    const isManagerOrAdmin = req.roles.includes('Manager') || req.roles.includes('Admin');
    if (!isManagerOrAdmin) {
        return res.status(403).json({ message: 'Forbidden: Only managers and admins can delete notes' });
    }

    const note = await Note.findById(id).exec();
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    const result = await note.deleteOne();

    res.json({ message: `Note '${result.title}' with ID ${result._id} deleted` });
});

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
};
