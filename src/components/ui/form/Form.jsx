export default function ({ children, handleSubmit, onSubmit }) {
  return (
    <form
      className='flex flex-row flex-wrap lg:items-center gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      {children}
    </form>
  );
}
