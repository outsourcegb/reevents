import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase'
import {reduxFirestore, getFirestore} from 'redux-firestore'
import rootReducer from './../reducers/rootReducer'
import thunk from 'redux-thunk'
import firebase from './../config/firebase'

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFireStoreForProfile: true
}

export const configureStore = (preloadedState) => {
  const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const storeEnhancer = [middlewareEnhancer]
  //const composedEnhancer = compose(...storeEnhancer)
  const composedEnhancer = composeWithDevTools(
    ...storeEnhancer, 
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  )

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  )

  if(process.env.NODE_ENV !== 'production') {
    if(module.hot) {
      module.hot.accept('../reducers/rootReducer', () => {
        const newRootReducer = require('../reducers/rootReducer').default
        store.replaceReducer(newRootReducer)
      })
    }
  }

  return store
}