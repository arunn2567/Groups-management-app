import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, BrowserHistory, IndexRoute } from 'react-router';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import _ from 'lodash';
import App from './components/app';
import GroupsIndex from './components/groups-index';
import GroupsNew from './components/groups-new';
import GroupsShow from './components/groups-show';

import { loadState, saveState } from './localStorage'
import reducers from './reducers';
import promise from 'redux-promise';

//creating a const to save the store created with middleware redux promise
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
//loading the persistedState from the local storage
const persistedState = loadState();
//creating the store using the middleware and persistedState
const store = createStoreWithMiddleware(reducers, persistedState);
// listening to changes in the state and saving it in the localStorage
store.subscribe(_.throttle(() => {
  saveState({
    groups: store.getState().groups
  }
  );
}, 1000));
//rendering the react dom with contents below into the container of index.html
//BrowserRouter to provide the routing
//switch to switch to the exact path match
//routes for the given path
ReactDOM.render(
  <Provider store={store}>
<BrowserRouter>
<div>
<Switch>
<Route path="/groups/new" component={GroupsNew} />
<Route path="/groups/:id" component={GroupsShow} />
<Route path="/" component={GroupsIndex} />
</Switch>
</div>
</BrowserRouter>
</Provider>
  , document.querySelector('.container'));
