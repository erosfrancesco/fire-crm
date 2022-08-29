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

/** 
  const [user, setUser] = useState();
  const [groceryList, setGroceryList] = useState();
  const [userId, setUserId] = useState();
  const [error, setError] = useState();

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [groceryListId, setGroceryListId] = useQueryString('listId');

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    authenticateAnonymously()
    .then(userCredential => {
      setUserId(userCredential.user.uid);

      if (groceryListId) {
        
      }
    })
    .catch(() => setError('anonymous-auth-failed'));
  }, [groceryListId, setGroceryListId]);

  function onGroceryListCreate(groceryListId, userName) {
    setGroceryListId(groceryListId);
    setUser(userName);
  }

  function onCloseGroceryList() {
    setGroceryListId();
    setGroceryList();
    setUser();
  }

  function onSelectUser(userName) {
    setUser(userName);
    getGroceryList(groceryListId)
      .then(updatedGroceryList => setGroceryList(updatedGroceryList.data()))
      .catch(() => setError('grocery-list-get-fail'));
  }
  /** */