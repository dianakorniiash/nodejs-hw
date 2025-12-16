import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';


const validateObjectId = (value, helpers) => {
  const isValid = isValidObjectId(value);

  if (!isValid) {
    return helpers.error('noteId.invalid');
  }
  return value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().required().custom(validateObjectId).messages({
      'noteId.invalid': '{{#value}} must be a valid mongo id!',
    }),
  }),
};
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...Object.values(TAGS))
      .optional(),
  }),
};

export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...Object.values(TAGS)),
  }).min(1),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...Object.values(TAGS)),
    search: Joi.string().trim().allow(''),
  }),
};
