import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

render((
  <BrowserRouter>
      <App />
  </BrowserRouter>
), document.getElementById('root'));
