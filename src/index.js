import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
