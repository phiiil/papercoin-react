import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Nothing You Could Do:400', 'cursive', 'Material Icons']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
