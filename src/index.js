import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import * as serviceWorker from './serviceWorker';

import 'semantic-ui/dist/semantic.css'
import './index.css';

// configure AWS amplify
Amplify.configure(awsconfig);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
