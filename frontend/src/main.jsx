import * as React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './styles/base.css'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store.js';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);
