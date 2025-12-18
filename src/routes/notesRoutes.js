import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { createNoteSchema, getAllNotesSchema, noteIdSchema, updateNoteSchema } from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();
router.use('/notes', authenticate);
router.get(
  '/notes',
  celebrate(getAllNotesSchema, { abortEarly: false }),
  getAllNotes,
);
router.get(
  '/notes/:noteId',
  celebrate(noteIdSchema, { abortEarly: false }),
  getNoteById,
);
router.post(
  '/notes',
  celebrate(createNoteSchema, { abortEarly: false }),
  createNote,
);
router.delete(
  '/notes/:noteId',
  celebrate(noteIdSchema, { abortEarly: false }),
  deleteNote,
);
router.patch(
  '/notes/:noteId',
  celebrate(updateNoteSchema, { abortEarly: false }),
  updateNote,
);

export default router;
