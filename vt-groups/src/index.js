import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, BrowserHistory, IndexRoute } from 'react-router';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './components/app';
import GroupsIndex from './components/groups-index';
import GroupsNew from './components/groups-new';
import GroupsShow from './components/groups-show';

import {loadState, saveState} from './localStorage'
import reducers from './reducers';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const persistedState = loadState();
const store = createStoreWithMiddleware(reducers, persistedState);
store.subscribe(()=>{
  saveState({
 groups:store.getState().groups
}
  );
})
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
