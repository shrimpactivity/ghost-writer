import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBVieoY7WzKZjYgUZaoqcVUv-olZIVMLWA',
  authDomain: 'ghostwriter-358c9.firebaseapp.com',
  projectId: 'ghostwriter-358c9',
  storageBucket: 'ghostwriter-358c9.appspot.com',
  messagingSenderId: '243657980143',
  appId: '1:243657980143:web:baff5b2bed8b0ed225c31a',
  measurementId: 'G-RQYRRRJJV5',
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
