import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import axios from 'axios'
import thunk from 'redux-thunk'

axios.defaults.baseURL = 'http://api-oauth.dev/'
axios.defaults.headers.common['Authorization'] = 'Bearer 850357648e9b95b505a64e53da5d25f4ab5d227be6a881a456885e55ca096199'


console.debug('axios', axios);

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
}

const basicReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_START': {
      return { ...state, fetching: true}
      break;
    }
    case 'FETCH_USERS_ERROR': {
      return { ...state, fetching: false, error: action.payload}
      break;
    }
    case 'RECEIVE_USERS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      }
      break;
    }
  }
}

// const userReducer = (state={}, action) => {
//   switch(action.type){
//     case "CHANGE_NAME": {
//       state = { ...state, name: action.payload }
//       state.name = action.payload;
//       break;
//     }
//     case "CHANGE_AGE": {
//       state = { ...state, age: action.payload }
//       break;
//     }
//     case "ERROR": {
//       throw new Error(action.payload);
//     }
//   }
//   return state;
// }


// const tweetsReducer = (state={}, action) => {
//   return state;
// }
// const reducers = combineReducers({
//   user: userReducer,
//   tweets: tweetsReducer
// })

// const initialReducers = { user: undefined, tweets: undefined }

// const logger = (store) => (next) => (action) => {
//   console.log('action fired', action);
//   next(action);
// }

// const error = (store) => (next) => (action) => {
//   try {
//     next(action);
//   } catch(e) {
//     console.log('error', e);
//   }
// }

const middleware = applyMiddleware(thunk, logger());
const store = createStore(basicReducer , middleware);

store.subscribe(() => {
  console.log('store changed', store.getState());
})

store.dispatch((dispatch) => {
  dispatch({ type: 'FETCH_USERS_START'})
  axios.get("/api/v1/users")
    .then((response)=>{
      dispatch({ type: 'RECEIVE_USERS', payload: response.data})
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_USERS_ERROR', payload: err})
    })
})
// store.dispatch({ type: "CHANGE_NAME", payload: 'Will'})
// store.dispatch({ type: "CHANGE_AGE", payload: 35})
// store.dispatch({ type: "CHANGE_AGE", payload: 36})
// store.dispatch({ type: "ERROR", payload: 36})
