import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import rootReducer from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // берет все мидлверы и использует их в редаксе, с помощью applyMiddleware использовать функции при каждом их action
);


export default store;
