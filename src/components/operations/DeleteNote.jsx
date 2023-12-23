'use client';

import useWalletStore from '@/store/useWalletStore';
import { MONEY_FORMAT } from '@/utils/constants';
import { deleteNoteSchema } from '@/utils/validation/noteValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ui/form/ErrorMessage';
import Select from '../ui/form/Select';
import SubmitButton from '../ui/form/SubmitButton';
import { motion } from 'framer-motion';
import OperationHeader from '../ui/OperationHeader';
import Form from '../ui/form/Form';

export default function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deleteNoteSchema),
  });

  const totalNotes = useWalletStore(state => state.totalNotes);
  const deleteNote = useWalletStore(state => state.deleteNote);

  const quantityOptions = totalNotes?.map(note => ({
    name: note.value + ' ' + MONEY_FORMAT,
    value: note.value,
  }));

  const onSubmit = data => {
    // console.log(data, 'data');
    deleteNote(data);
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: '20px' }}
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
