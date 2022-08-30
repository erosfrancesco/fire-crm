import React, { useEffect } from 'react';

import CreateList from './CreateList/CreateList';
import JoinList from './JoinList/JoinList';
import EditList from './EditList/EditList';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

import useQueryString from '../hooks/useQueryString';
import { useUser } from '../hooks/useUser';
import { useGroceries } from '../hooks/useGroceries'

import shallow from 'zustand/shallow'


export function GroceryScene() {

  const { login, user, setUser, userId, error: userError } = useUser((p) => (p), shallow);
  const { fetchGroceryList, groceryList, setGroceryList, error: groceryListError } = useGroceries((p) => (p), shallow)

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [groceryListId, setGroceryListId] = useQueryString('listId');

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    login()
    .then(() => {
      if (!groceryListId) {
        return
      }

      fetchGroceryList(groceryListId)
    })
  }, [groceryListId]);

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
    fetchGroceryList(groceryListId);
  }
  
  // render a scene based on the current state
  if (groceryList && user) {
    return <EditList {...{ groceryListId, user, onCloseGroceryList, userId}} />;
  }

  if (groceryList) {
    return <div>
      <ErrorMessage errorCode={groceryListError || userError}></ErrorMessage>
      <JoinList users={groceryList.users} {...{groceryListId, onSelectUser, onCloseGroceryList, userId}} />
    </div>
  }

  return <div>
    <ErrorMessage errorCode={groceryListError || userError} />
    <CreateList onCreate={onGroceryListCreate} userId={userId} />
  </div>
}

export default GroceryScene;
