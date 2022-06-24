import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
//import header from './components/header';
import Navtopbar from './components/Navtopbar';


const rootElement = 
document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);



