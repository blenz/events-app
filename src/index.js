import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';
import ScrollToTop from './common/util/ScrollToTop';

const store = createStore(rootReducer, devToolsEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
