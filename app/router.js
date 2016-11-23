import React from 'react';
import { Router, Route, useRouterHistory, routerRedux } from './common/router';

export default function({ history, app }) {

  const routes = [
    {
      path: '/essence/:id',
      name: 'essence',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          app.model(require('./models/essence'));
          cb(null, require('./routes/essence'));
        });
      },
    },
  ];

  return <Router history={ history } routes={ routes } />;
}
