import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, hashHistory, Redirect } from 'react-router';
import { persistStore } from 'redux-persist';
import ReactWebApp from './App';
import Login from '../Components/Login';
import Home from '../Components/Home';
import store from '../store/configureStore';

export default class Root extends Component {
  constructor() {
    super();
    this.state = {
      rehydrated: false,
    };
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
      });
  }

  render() {
    if (!this.state.rehydrated) {
      return null;
    }
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={ReactWebApp}>
            <IndexRedirect to='login' />
            <Route path="login" component={Login} />
              <Route path="home" component={Home}/>
          </Route>
          <Redirect from='*' to='/home' />
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
