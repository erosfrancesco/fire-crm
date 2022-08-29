import app from './firebase';

import { 
    getFirestore,
    query,
    orderBy,
    onSnapshot,
    collection,
    getDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    doc, 
    serverTimestamp, 
    arrayUnion
} from "firebase/firestore";

const db = getFirestore(app)

export const collectionName = 'groceryLists';

export const createGroceryList = (userName, userId) => {
    const groceriesColRef = collection(db, collectionName);
    
    const doc = addDoc(groceriesColRef, {
            created: serverTimestamp(),
            createdBy: userId,
            users: [{ 
                userId: userId,
                name: userName
            }]
    });

    return doc;
};

export const getGroceryList = (groceryListId) => {
    const groceryDocRef = doc(db, collectionName, groceryListId)
    return getDoc(groceryDocRef);
};

export const getGroceryListItems = (groceryListId) => {
    const itemsColRef = collection(db, collectionName, groceryListId, 'items')
    return getDocs(itemsColRef)
}

export const streamGroceryListItems = (groceryListId, snapshot, error) => {
    const itemsColRef = collection(db, collectionName, groceryListId, 'items')
    const itemsQuery = query(itemsColRef, orderBy('created'))
    return onSnapshot(itemsQuery, snapshot, error);
};

export const addUserToGroceryList = (userName, groceryListId, userId) => {
    const groceryDocRef = doc(db, collectionName, groceryListId)
    return updateDoc(groceryDocRef, {
            users: arrayUnion({ 
                userId: userId,
                name: userName
            })
        });
};

export const addGroceryListItem = (item, groceryListId, userId) => {
    return getGroceryListItems(groceryListId)
        .then(querySnapshot => querySnapshot.docs)
        .then(groceryListItems => groceryListItems.find(groceryListItem => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
        .then( (matchingItem) => {
            if (!matchingItem) {
                const itemsColRef = collection(db, collectionName, groceryListId, 'items')
                return addDoc(itemsColRef, {
                        name: item,
                        created: serverTimestamp(),
                        createdBy: userId
                    });
            }
            throw new Error('duplicate-item-error');
        });
};