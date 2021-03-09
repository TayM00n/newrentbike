import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
      <App dispatch={store.dispatch}/>
  </Provider>,
  document.getElementById('root')
);
