import create from 'zustand';
import { authenticateAnonymously } from '../services/firestore';

export const useUser = create(set => ({
    // state
    user: null,
    userId: null,
    error: null,

    // set
    setUser: user => set({ user }),
    setUserId: userId => set({ userId }),

    // logic
    login: () => {
        set({ error: null });
        
        return authenticateAnonymously()
            .then(userCredential => {
                const userId = userCredential.user.uid;
                set({ userId });
            })
            .catch(() => set({ error: 'anonymous-auth-failed' }));
    }
}));

export default useUser;

/** 
  const [user, setUser] = useState();
  const [groceryList, setGroceryList] = useState();
  const [userId, setUserId] = useState();
  const [error, setError] = useState();

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [groceryListId, setGroceryListId] = useQueryString('listId');

  // useState(() => console.log('Hello app: ', process.env), []);

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    authenticateAnonymously()
    .then(userCredential => {
      setUserId(userCredential.user.uid);

      if (groceryListId) {
        getGroceryList(groceryListId)
          .then(groceryList => {
            if (groceryList.exists) {
              setError(null);
              setGroceryList(groceryList.data());
            } else {
              setError('grocery-list-not-found');
              setGroceryListId();
            }
          })
          .catch(() => setError('grocery-list-get-fail'));
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