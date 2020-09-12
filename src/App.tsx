import './App.scss';

import { ConnectedProps, connect } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { loadProducts, setLoading } from './store/products/actions';

import Header from './components/Header/Header';
import Products from './pages/Products/Products';
import React from 'react';
import { useEffect } from 'react';

enum Routes {
  Products = "/",
  NotFound = "/404"
};

const App: React.FC<PropsFromRedux> = ({setLoading, loadProducts}) => {
  useEffect(() => {
    setLoading(true);
    loadProducts(() => setLoading(false));
  }, [setLoading, loadProducts]);

  return (
    <Router>
      <Header />
      
      <Switch>
        <Route path={Routes.Products} exact={true} component={Products} />
        <Route path={Routes.NotFound} exact={true} component={Products} />

        <Redirect to={Routes.NotFound} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  loadProducts,
  setLoading
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);

