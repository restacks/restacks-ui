import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect');

import { configureStore } from './app/redux/store';
import routes from './app/routes';
import { Html } from './app/containers';

const manifest = require('../build/manifest.json');

export default (req, res) => {
  const location = req.url;
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const asyncRenderData = Object.assign({}, renderProps, { store });

        loadOnServer(asyncRenderData).then(() => {
          const markup = ReactDOMServer.renderToString(
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          res.status(200).send(renderHTML(markup));
        });

        function renderHTML(markup) {
          const html = ReactDOMServer.renderToString(
            <Html markup={markup} manifest={manifest} store={store} />
          );

          return `<!doctype html> ${html}`;
        }
      } else {
        res.status(404).send('<p style="font-size: 50px; text-align: center;">¯\\_(ツ)_/¯ 404</p>');
      }
    });
}