'use client';

import useWalletStore from '@/store/useWalletStore';
import { MONEY_FORMAT } from '@/utils/constants';
import { updateNoteSchema } from '@/utils/validation/noteValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ui/form/ErrorMessage';
import Input from '../ui/form/Input';
import Select from '../ui/form/Select';
import SubmitButton from '../ui/form/SubmitButton';
import OperationHeader from '../ui/OperationHeader';
import Form from '../ui/form/Form';

export default function () {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateNoteSchema),
  });

  const totalNotes = useWalletStore(state => state.totalNotes);
  const updateQuantity = useWalletStore(state => state.updateQuantity);

  const quantityOptions = totalNotes?.map(note => ({
    name: note.value + ' ' + MONEY_FORMAT,
    value: note.value,
  }));

  const onSubmit = data => {
    updateQuantity(data);
    reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: '20px' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, type: 'spring', stiffness: 40 }}
      className='flex-1 operation--update  rounded-md px-5 py-3'
    >
      <OperationHeader headerContent='Update Note' />
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Select
          register={register('note')}
          options={[{ name: 'Select Note', value: '' }, ...quantityOptions]}
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
