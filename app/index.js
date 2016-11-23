import './index.html';

// 基础库
import React from 'react';
import dva from '../src/index';
import pathToRegexp from 'path-to-regexp';

// 公共库
import { Router, Route, useRouterHistory, routerRedux } from './common/router';
import fetch from './common/fetch';

// 1. Initialize
const app = dva();

// 2. Router
app.router(require('./router'));

// 3. Start
app.start('#root');