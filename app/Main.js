import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

// components
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost';
import Axios from 'axios';
import FlashMessages from './components/FlashMessages';

Axios.defaults.baseURL = 'http://localhost:8080';

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('complexappToken')),
    flashMessage: [],
  };
  function ourReducer(state, action) {
    switch (action.type) {
      case 'login':
        return { loggedIn: true, flashMessage: state.flashMessage };
      case 'logout':
        return { loggedIn: false, flashMessage: state.flashMessage };
      case 'flashMessage':
        return {
          loggedIn: state.loggedIn,
          flashMessage: state.flashMessage.concat(action.value),
        };
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/post/:id">
              <ViewSinglePost />
            </Route>
            <Route path="/about-us">
              <About />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}
