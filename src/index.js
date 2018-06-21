import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import {configureStore} from './app/store/configureStore';
import ScrollToTop from './app/common/util/ScrollToTop';
import {loadEvents} from './app/feature/event/eventActions';
const store = configureStore()

const rootEl = document.getElementById('root');
store.dispatch(loadEvents());

let render = () => {
  ReactDOM.render( 
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <App / >
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    rootEl );
}

if(module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render)
  })
}

//AIzaSyBSy55VZSkRujpbctAVai97eQpI5_LZOmc

render();

registerServiceWorker();


