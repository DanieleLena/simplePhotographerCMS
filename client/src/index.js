import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from "redux";
// import allReducers from "./reducers";
import userReducer from "./reducers/userReducer";

import { Provider } from "react-redux";

const initialStore = {
  user:{
    name: '',
    token: ''
  },
isLogIn: false,
}

const store = createStore(
  userReducer,initialStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
 

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);


