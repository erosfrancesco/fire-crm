import create from 'zustand';
import { getGroceryList } from '../services/firestore';

export const useGroceries = create(set => ({
    // state
    groceryList: null,
    error: null,

    // set
    setGroceryList: groceryList => set({ groceryList }),
    setError: error => set({ error }),

    // logic
    fetchGroceryList: (groceryListId) => {
        set({ error: null });

        return getGroceryList(groceryListId)
          .then(data => {
            const error = data.exists ? null : 'grocery-list-not-found'
            const groceryList = data.exists ? data.data() : null
            
            set({ error })
            set({ groceryList })
          })
          .catch(() => set({ error: 'grocery-list-get-fail' }));
    }
}));

export default useGroceries;
