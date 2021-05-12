import { composeWithDevTools } from 'redux-devtools-extension'; 
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';
import { loginReducer } from '../reducers/loginReducer';

const middleware = [
  thunk,
];

const reducers = combineReducers({
  login: loginReducer
})

export const store = createStore(
  reducers,
    composeWithDevTools(
      applyMiddleware(...middleware),
    )
);