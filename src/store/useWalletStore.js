import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools } from 'zustand/middleware';

const useWalletStore = create(
  persist(
    immer(
      devtools(set => ({
        totalBalance: 255,
        totalNotes: [
          { value: 1, quantity: 5 },
          { value: 5, quantity: 10 },
          { value: 10, quantity: 20 },
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
          set(state => {
            const tempNotes = [...state.totalNotes];
            const newNote = {
              value: +payload.note,
              quantity: +payload.quantity,
            };

            let inserted = false;

            for (let i = tempNotes.length - 1; i >= 0; i--) {
              if (+payload.note <= tempNotes[i].value) {
                tempNotes[i + 1] = tempNotes[i];
              } else {
                tempNotes[i + 1] = newNote;
                inserted = true;
                break;
              }
            }

            if (!inserted) {
              tempNotes[0] = newNote; // Insert at the beginning if not inserted yet
            }

            return {
              totalNotes: tempNotes,
              totalBalance:
                state.totalBalance + payload.note * payload.quantity,
            };
          }),

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

            return { totalNotes, totalBalance };
          }),
      }))
    ),
    {
      name: 'wallet-storage',
      // skipHydration: true,
    }
  )
);

export default useWalletStore;
