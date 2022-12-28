import React, { lazy, Suspense, useState, useEffect } from 'react';
import Header from './components/Header'
import Progress from './components/Progress';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// import AuthApp from './components/AuthApp';
// import MarketingApp from './components/MarketingApp';

const AuthLazy = lazy(() => import('./components/AuthApp'))
const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))

const history = createBrowserHistory()

export default () => {
  const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
  })

  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard')
    }
  }, [isSignedIn])

  return <Router history={history}>
    <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {/* If the user is not signed in, then redirect it to the landing page */}
              {!isSignedIn && <Redirect to="/" />}
              <DashboardLazy />
            </Route>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </div>;
    </StylesProvider>
  </Router>
};
