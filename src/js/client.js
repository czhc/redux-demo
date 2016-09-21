import { applyMiddleware, combineReducers, createStore } from 'redux'

const userReducer = (state={}, action) => {
  switch(action.type){
    case "CHANGE_NAME": {
      state = { ...state, name: action.payload }
      state.name = action.payload;
      break;
    }
    case "CHANGE_AGE": {
      state = { ...state, age: action.payload }
      break;
    }
    case "ERROR": {
      throw new Error(action.payload);
    }
  }
  return state;
}


const tweetsReducer = (state={}, action) => {
  return state;
}
const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
})

const initialReducers = { user: undefined, tweets: undefined }

const logger = (store) => (next) => (action) => {
  console.log('action fired', action);
  next(action);
}

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch(e) {
    console.log('error', e);
  }
}

const middleware = applyMiddleware(logger, error);
const store = createStore(reducers, initialReducers , middleware);

store.subscribe(() => {
  console.log('store changed', store.getState());
})


store.dispatch({ type: "CHANGE_NAME", payload: 'Will'})
store.dispatch({ type: "CHANGE_AGE", payload: 35})
store.dispatch({ type: "CHANGE_AGE", payload: 36})
store.dispatch({ type: "ERROR", payload: 36})
