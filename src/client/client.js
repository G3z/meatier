import {render} from 'react-dom';
import React from 'react';
import {syncHistory, routeReducer} from 'redux-simple-router'
import im, {Map, fromJS} from 'immutable';
import {ensureState} from 'redux-optimistic-ui';

const makeStore = __PRODUCTION__ ? require('./makeStore.prod.js') : require('./makeStore.dev.js');
const Root = __PRODUCTION__ ? require('./Root.prod.js') : require('./Root.dev.js');
const {auth, routing, form} = window.__INITIAL_STATE__;

// Currently has mutable objects in immutable state Map, not great
// form: https://github.com/erikras/redux-form/issues/487#issuecomment-168943880
// routing: the sync function uglies up state if i use immutable, need to research this more
let initialState = Map([
  ['auth', fromJS(auth)],
  ['routing', routing],
  ['form', form]
]);

const store = makeStore(initialState);
render(<Root store={store}/>, document.getElementById('root'));

// Will implement when react-router supports HMR
//if (module.hot) {
//  module.hot.accept('../universal/redux/makeReducer', () => {
//    const nextRootReducer = require('../universal/redux/makeReducer')
//    store.replaceReducer(nextRootReducer())
//  })
//  //module.hot.dispose(data => data.foo = 'hi');
//}
//const model = new Model();
//render(<TodoApp model={model}/>, document.getElementById('root'));

