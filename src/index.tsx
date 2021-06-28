import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Button } from './components/button';

import './services/firebase'

ReactDOM.render(
  <React.StrictMode>
    <App/>
    <Button text="Olá!"/>
  </React.StrictMode>,
  document.getElementById('root')
);
