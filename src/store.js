import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { save } from 'redux-localstorage-simple'

/* eslint-disable no-underscore-dangle */

//store - глобальное хранилище данных приложения. Redux отвечает за хранение данных приложения и работу с ними
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const configureStore = preloadedState => (
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(save({ namespace: 'orders-list' }))
    ),
  )
);

const store = configureStore({});

store.subscribe(() => {
  console.log('subscribe', store.getState())
});

export default store;
