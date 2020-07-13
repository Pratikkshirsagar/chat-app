import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

function HeaderLoggedIn(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  function handleLogout() {
    appDispatch({ type: 'logout' });
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button className="btn btn-sm btn-secondary" onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
