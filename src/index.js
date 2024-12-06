import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import AppStore from './redux/AppStore';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
