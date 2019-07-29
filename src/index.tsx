import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import store from './store'
import Root from './App'
import './index.css';

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root') as HTMLElement
);
store.subscribe(() => {
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root') as HTMLElement
  );
})
registerServiceWorker();
