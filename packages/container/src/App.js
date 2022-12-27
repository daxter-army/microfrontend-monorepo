import React, { lazy, Suspense, useState } from 'react';
import Header from './components/Header'
import Progress from './components/Progress';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// import AuthApp from './components/AuthApp';
// import MarketingApp from './components/MarketingApp';

const AuthLazy = lazy(() => import('./components/AuthApp'))
const MarketingLazy = lazy(() => import('./components/MarketingApp'))

export default () => {
  const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
  })

  const [isSignedIn, setIsSignedIn] = useState(false)

  return <BrowserRouter>
    <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </div>;
    </StylesProvider>
  </BrowserRouter>
};
