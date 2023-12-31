import { z } from 'zod';

export const updateNoteSchema = z.object({
  note: z.string().min(1, { message: 'Please select a note' }),
  quantity: z
    .string()
    .min(1, { message: 'Quantity is required' })
    .refine(val => !isNaN(val), {
      message: 'Please input a valid number',
    })
    .refine(val => parseInt(val) > 0, {
      message: 'Quantity must be greater than zero',
    })
    .refine(val => !/\./.test(val), {
      message: 'Note quantity must be a whole number',
    }),
});

export const addNoteSchema = z.object({
  note: z
    .string()
    .min(1, { message: 'Note value is required' })
    .refine(val => !isNaN(val), {
      message: 'Please input a valid number',
    })
    .refine(val => parseInt(val) > 0, {
      message: 'Note value must be greater than zero',
    })
    .refine(val => !/\./.test(val), {
      message: 'Note value must be a whole number',
    }),
  quantity: z
    .string()
    .min(1, { message: 'Quantity is required' })
    .refine(val => !isNaN(val), {
      message: 'Please input a valid number',
    })
    .refine(val => parseInt(val) > 0, {
      message: 'Quantity must be greater than zero',
    })
    .refine(val => !/\./.test(val), {
      message: 'Note quantity must be a whole number',
    }),
});

export const deleteNoteSchema = z.object({
  note: z.string().min(1, { message: 'Please select a note' }),
});
