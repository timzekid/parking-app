import React, { Component, PropTypes } from 'react';

import styles from './App.less';

export default class App extends Component {
    render() {
        return (
            <div className={styles.app} id='app'>
                Hello
            </div>
        );
    }
}
