import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const freecom = {
  companyName: 'Graphcool',
  companyLogoURL: 'http://imgur.com/qPjLkW0.png',
  mainColor: 'rgba(39,175,96,1)'
}

ReactDOM.render(<App freecom={freecom} />, document.getElementById('root'));
registerServiceWorker();
