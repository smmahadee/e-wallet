import React from 'react';

const Select = props => {
  const {
    required = false,
    containerClass,
    id,
    className,
    value,
    label = '',
    register,
    errors,
    options = [],
    ...rest
  } = props;

  return (
    <div className={`w-full lg:max-w-36 ${containerClass}`}>
      <label className='block mb-1 text-md' htmlFor={id}>
        {label}
      </label>

      <select
        value={value}
        className={` ${className} w-full py-1.5 px-2 rounded-md bg-[#ffffff66] focus:bg-[#ffffff88] focus:outline-none  ${
          errors ? 'border-red-400 border-solid focus:ring-red-200' : ''
        }`}
        id={id}
        {...register}
        {...rest}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      {errors && (
        <p className='absolute top-[100%] text-sm text-red-600 my-1'>
          {errors?.message}
        </p>
      )}
    </div>
  );
};

export default Select;
