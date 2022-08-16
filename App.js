import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from './Navigation/PlacesNavigator';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import PlacesReducer  from './Store/Places-reducer';
import {init} from './helpers/db'

init().then(()=>{
  console.log('Intialized database')
}).catch(err=>{
  console.log('Intialized db falied')
  console.log(err)
})

const rootReducer = combineReducers({
  Places: PlacesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return <Provider store={store}>
    <PlacesNavigator />
    </Provider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
