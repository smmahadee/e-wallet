import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools } from 'zustand/middleware';

const useWalletStore = create(
  persist(
    immer(
      devtools(set => ({
        totalBalance: 115,
        totalNotes: [
          { value: 1, quantity: 5 },
          { value: 5, quantity: 6 },
          { value: 10, quantity: 8 },
        ],

        updateQuantity: payload =>
          set(state => {
            const totalNotes = state.totalNotes.map(n =>
              n.value == payload.note ? { ...n, quantity: payload.quantity } : n
            );

            let totalBalance = totalNotes.reduce(
              (acc, note) => acc + note.value * note.quantity,
              0
            );

            return { totalNotes, totalBalance };
          }),

        addNote: payload =>
          set(state => ({
            totalNotes: [
              ...state.totalNotes,
              { value: +payload.note, quantity: +payload.quantity },
            ],
            totalBalance: state.totalBalance + payload.note * payload.quantity,
          })),

        deleteNote: payload =>
          set(state => {
            let totalBalance = state.totalBalance;

            const totalNotes = state.totalNotes.filter(note => {
              if (note.value !== +payload.note) {
                return true;
              } else {
                totalBalance -= note.value * note.quantity;
                return false;
              }
            });

            console.log(totalNotes, 't');

            return { totalNotes, totalBalance };
          }),
      }))
    ),
    {
      name: 'wallet-storage',
      skipHydration: true,
    }
  )
);

export default useWalletStore;
