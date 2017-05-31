import 'babel-polyfill';
import React      from 'react';
import { render } from 'react-dom';

import App from './components/App.jsx';

/* eslint-disable more/no-window */
window.onload = function startApplication() {
    render(
        <App />,
        document.getElementById('root')
    );
};
/* eslint-enable more/no-window */
