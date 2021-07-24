import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
