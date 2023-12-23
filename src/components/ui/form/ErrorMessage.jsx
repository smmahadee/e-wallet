export default function ({
  errorMessage = 'There is an error',
  color = 'text-[#e74c3c]',
}) {
  return (
    <span className={`text-sm my-2 inline-block ${color}`}>{errorMessage}</span>
  );
}
