import React from 'react'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'

import { createStore, combineReducers } from 'redux'

import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
}

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

// Setup react-redux so that connect HOC can be used
export function StateWrapper(props) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {props.children}
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default StateWrapper