import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import ScrollToTop from './common/util/ScrollToTop';
import { loadEvent } from './actions/eventActions';
import ReduxToastr from 'react-redux-toastr';

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
