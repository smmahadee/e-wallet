import React from 'react';

const Input = props => {
  const {
    required = false,
    containerClass,
    id,
    className,
    type = 'text',
    value,
    label = '',
    placeholder = '',
    register,
    errors,
    ...rest
  } = props;

  return (
    <div className={`w-full lg:max-w-36  ${containerClass}`}>
      <label className='block mb-1 text-base' htmlFor={id}>
        {label}
      </label>
      <input
        className={`w-full py-1.5 px-2 rounded-md bg-[#ffffff66]  transition-all focus:bg-[#ffffff88] focus:outline-none  placeholder:text-[#444] placeholder:text-sm  ${className}`}
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        {...register}
        {...rest}
      />

      {errors && <p className='text-sm	text-red-600 my-1'>{errors?.message} </p>}
    </div>
  );
};

export default Input;
