import React, { Component } from 'react';

import config  from '../config.js';
import Parking from './Parking.jsx';
import styles  from './App.less';

export default class App extends Component {
    render() {
        const {
            truksPlacesMaximum,
            disabledPlacesMaximum,
            totalPlaces
        } = config;

        return (
            <div className={styles.app} id='app'>
                <Parking
                    truksPlacesMaximum={truksPlacesMaximum}
                    disabledPlacesMaximum={disabledPlacesMaximum}
                    totalPlaces={totalPlaces}
                />
            </div>
        );
    }
}
