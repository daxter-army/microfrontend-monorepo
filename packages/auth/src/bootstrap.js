import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  // TO ALSO SUPPORT ISOLATION RUNNING OF THE MARKETING APP
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  // FOR COMMUTING ROUTING EVENTS FROM SUB-APPS TO CONTAINER APPS
  // TO ALSO SUPPORT ISOLATION RUNNING OF THE MARKETING APP
  // BECAUSE IN ISOLATION, onNavigate is undefined
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  // FOR COMMUTING ROUTING EVENTS FROM CONTAINER APP TO SUB-APPS
  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location

      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    }
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
