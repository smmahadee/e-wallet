import TotalBalance from '@/components/ui/TotalBalance';
import Notes from '@/components/notes/Notes';
import AddNote from '@/components/operations/AddNote';
import DeleteNote from '@/components/operations/DeleteNote';
import UpdateNote from '@/components/operations/UpdateNote';

export default function Home() {
  return (
    <>
      <TotalBalance />
      <Notes />
      <div className=' flex flex-col gap-6 text-[#333] overflow-y-auto'>
        <AddNote />
        <UpdateNote />
        <DeleteNote />
      </div>
    </>
  );
}
