import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
import Examplecontext from './ExampleContext';
import ExampleContext from './ExampleContext';

Axios.defaults.baseURL = 'http://localhost:8080';

function Main() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('complexappToken'))
  );

  const [flashMessages, setFlashMessages] = useState([]);

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg));
  }

  return (
    <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home /> : <HomeGuest />}
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
    </ExampleContext.Provider>
  );
}

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}
