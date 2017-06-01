import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import logo from './logo.svg'

const freecom = {
  companyName: 'Rana',
  companyLogoURL: logo,
  mainColor: 'rgba(0,105,255,1)'
}

ReactDOM.render(<App freecom={freecom} />, document.getElementById('root'));
registerServiceWorker();
