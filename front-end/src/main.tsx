import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactDOM } from 'react';
import { Provider } from 'react-redux';
import App from './App.tsx'
import './App.css'
import userReducer from './state/index.ts'
import {
  persistStore,
  FLUSH, //forces redux-persist to be writeen to sotrage engine (updated state is saved )
  REHYDRATE, //reloads back from local to state
  PAUSE,
  PERSIST, //begins to persiste state when action is dispatched to your local stroage
  PURGE, //clers state
  REGISTER //register persistor with store when it intializes 
} from "redux-persist"; //store the user's state in local storage
//prsistStore - creates a persistor which is responsible for persisting and rehydrating the state between browser sessions 
import storage from "redux-persist/lib/storage"; //using the browsers local storage to save my redux state 
import { PersistGate } from "redux-persist/integration/react"; //ensures ui only renders after persisted state has been rehydrated from local storage 
import persistReducer from "redux-persist/es/persistReducer"; //wraps your authreducer with persistence logic to store its state in local storage
import { configureStore } from '@reduxjs/toolkit';
const persistConfig = {key: "root", storage, version: 1}; //stored in local stroage (root) version of your persisted state
const persistedReducer = persistReducer(persistConfig, userReducer);//add persistence functionality and now will automatically save and load its state to and from local storage 
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: { //don't check these actions 
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], //you don't interact with these actions manually redux takes caere of it .
          },
      }),
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store ={store}>

      <PersistGate loading ={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)