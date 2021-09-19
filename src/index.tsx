import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';
import { GlobalStyle } from './styles/global';

createServer({
  models: {
    transactions: Model,
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => this.schema.all('transactions'));

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transactions', {...data, createdAt: new Date()});
    })
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
