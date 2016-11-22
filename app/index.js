import './index.html';
import React from 'react';
import dva from '../src/index';
import { connect } from './common/index';
import { Router, Route, useRouterHistory, routerRedux } from './common/router';
import fetch from './common/fetch';
import styles from './index.less';
import ChatList from './components/ChatList';

import pathToRegexp from 'path-to-regexp';

// 1. Initialize
const app = dva();

// 2. Model
app.model({
  namespace: 'essence',
  state: {
    query: '',
    chatlist: [],
  },
  subscriptions: {
    setup({ dispatch, history, state, props}) {
      history.listen(({ pathname }, state) => {
        if (pathToRegexp('/essence/:id').test(pathname)) {

          //TODO
          var pathnameArr = pathname.split("/");
          if (pathnameArr.length > 2) {
            dispatch({
              type: 'setQuery',
              payload: pathnameArr[2]
            });
          }

        }
      });
    },
  },
  effects: {
    setQuery: [function*({ payload }, { put, call }) {
      yield call(routerRedux.push, {
        query: { q: payload || '' },
      });
      const { success, data } = yield fetch(`/api/search?q=${payload}`)
        .then(res => res.json());
      if (success) {
        yield put({
          type: 'setChatlist',
          payload: data,
        });
      }
    }, { type: 'takeLatest' }],
  },
  reducers: {
    setQuery(state, { payload }) {
      return { ...state, query: payload };
    },
    setChatlist(state, { payload }) {
      return { ...state, chatlist: payload };
    },
  },
});

//带绑定的view
const Appview = (props) => {
  console.log(props.chatlist);
  return (
    <div className={styles.app}>
      <ChatList chatlist={props.chatlist} />
    </div>
  );
} 

const App = connect(
({ essence }) => ({
  query: essence.query,
  chatlist: essence.chatlist,
})
)(Appview);

// 4. Router
app.router(({ history }) =>
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/essence/:id" component={App} />
  </Router>
);

// 5. Start
app.start('#root');
