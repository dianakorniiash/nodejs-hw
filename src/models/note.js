import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: { type: String, trim: true, default: '', required: false },
    tag: {
      type: String,
      default: 'Todo',
      required: false,
      enum: Object.values(TAGS),
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
noteSchema.index(
  { title: 'text', content: 'text' },
  {
    name: 'NoteTextIndex',
    weights: { title: 5, content: 1 },
    default_language: 'english',
  },
);
export const Note = model('Note', noteSchema);
