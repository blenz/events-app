import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './common/util/ScrollToTop';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import rootReducer from './reducers';
import ReduxToastr from 'react-redux-toastr';

import { loadEvent } from './actions/eventActions';

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

store.dispatch(loadEvent());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <ReduxToastr
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
        />
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
