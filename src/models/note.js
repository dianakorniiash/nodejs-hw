import { model, Schema } from 'mongoose';

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
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Note = model('Note', noteSchema);
