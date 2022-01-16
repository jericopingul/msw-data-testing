import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setupBrowserMock } from './mocks';

setupBrowserMock();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
