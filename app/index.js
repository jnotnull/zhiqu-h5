import './index.html';

// 基础库
import React from 'react';
import dva from '../src/index';
import pathToRegexp from 'path-to-regexp';

// 公共库
import { connect } from './common/index';
import { Router, Route, useRouterHistory, routerRedux } from './common/router';
import fetch from './common/fetch';

import essence from './models/essence';
import App from './routes/essence';

// 1. Initialize
const app = dva();

// 2. Model
app.model(essence);

// 4. Router
app.router(({ history }) =>
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/essence/:id" component={App} />
  </Router>
);

// 5. Start
app.start('#root');
