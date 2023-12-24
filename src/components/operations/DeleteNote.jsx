'use client';

import { useWallet } from '@/store/useStore';
import { MONEY_FORMAT } from '@/utils/constants';
import { deleteNoteSchema } from '@/utils/validation/noteValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import OperationHeader from '../ui/OperationHeader';
import ErrorMessage from '../ui/form/ErrorMessage';
import Form from '../ui/form/Form';
import Select from '../ui/form/Select';
import SubmitButton from '../ui/form/SubmitButton';
import toast from 'react-hot-toast';

export default function () {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deleteNoteSchema),
  });

  const { totalNotes, deleteNote } = useWallet();

  const quantityOptions = totalNotes
    ? totalNotes?.map(note => ({
        name: note.value + ' ' + MONEY_FORMAT,
        value: note.value,
      }))
    : [];

  const onSubmit = data => {
    deleteNote(data);
    toast.success('Note Deleted Successfully');
    reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: '-20px' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.6, type: 'spring', stiffness: 40 }}
      className='flex-1 operation--delete  rounded-md px-5 py-3'
    >
      <OperationHeader headerContent='Delete Note' />
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Select
          register={register('note')}
          options={[{ name: 'Select Note', value: '' }, ...quantityOptions]}
        />

        <SubmitButton />
      </Form>

      {/* FORM INPUT ERROR MESSAGES  */}
      {errors?.note && (
        <ErrorMessage color='text-black' errorMessage={errors?.note?.message} />
      )}
    </motion.section>
  );
}
