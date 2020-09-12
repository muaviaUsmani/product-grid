import './App.scss';

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Products from './pages/Products/Products';
import React from 'react';

enum Routes {
  Products = "/",
  NotFound = "/404"
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path={Routes.Products} exact={true} component={Products} />
        <Route path={Routes.NotFound} exact={true} component={Products} />

        <Redirect to={Routes.NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
