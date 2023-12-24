'use client';

import { useWallet } from '@/store/useStore';
import { MONEY_FORMAT } from '@/utils/constants';
import { updateNoteSchema } from '@/utils/validation/noteValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import OperationHeader from '../ui/OperationHeader';
import ErrorMessage from '../ui/form/ErrorMessage';
import Form from '../ui/form/Form';
import Input from '../ui/form/Input';
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
    resolver: zodResolver(updateNoteSchema),
  });

  const { totalNotes, updateQuantity } = useWallet();

  const noteOptions = totalNotes
    ? totalNotes?.map(note => ({
        name: note.value + ' ' + MONEY_FORMAT,
        value: note.value,
      }))
    : [];

  const onSubmit = data => {
    updateQuantity(data);
    toast.success('Note Updated Successfully');
    reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: '-20px' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, type: 'spring', stiffness: 40 }}
      className='flex-1 operation--update  rounded-md px-5 py-3'
    >
      <OperationHeader headerContent='Update Note' />
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Select
          register={register('note')}
          options={[{ name: 'Select Note', value: '' }, ...noteOptions]}
        />
        <Input placeholder='Quantity' register={register('quantity')} />
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
