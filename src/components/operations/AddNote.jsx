'use client';

import useWalletStore from '@/store/useWalletStore';
import { addNoteSchema } from '@/utils/validation/noteValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ErrorMessage from '../ui/form/ErrorMessage';
import Input from '../ui/form/Input';
import SubmitButton from '../ui/form/SubmitButton';
import Form from '../ui/form/Form';
import OperationHeader from '../ui/OperationHeader';

export default function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addNoteSchema),
  });

  const addNote = useWalletStore(state => state.addNote);
  const totalNotes = useWalletStore(state => state.totalNotes);

  const onSubmit = data => {
    const isExist = totalNotes.some(note => note.value === +data?.note);
    if (isExist) {
      toast.error('Note already exist');
      return;
    }

    addNote(data);
    reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: '20px' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.3, type: 'spring', stiffness: 40 }}
      className='flex-1  operation--add rounded-md px-5 py-3'
    >
      <OperationHeader headerContent='Add Note' />
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Input
          label='Note Value'
          placeholder='ex: 5 or 10'
          register={register('note')}
        />
        <Input
          label='Note quantity'
          placeholder='Quantity'
          register={register('quantity')}
        />
        <SubmitButton />
      </Form>

      {/* FORM INPUT ERROR MESSAGES  */}
      {errors?.note && <ErrorMessage errorMessage={errors?.note?.message} />}
      {!errors?.note && errors?.quantity && (
        <ErrorMessage errorMessage={errors?.quantity?.message} />
      )}
    </motion.section>
  );
}
