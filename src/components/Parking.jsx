import React, { Component } from 'react';

import styles from './Parking.less';

export default class Parking extends Component {
    render() {
        const {
            truksPlacesMaximum,
            disabledPlacesMaximum,
            totalPlaces
        } = this.props;

        return (
            <div>
                <div>Maximum places for truks: {truksPlacesMaximum}</div>
                <div>Maximum places for disabled: {disabledPlacesMaximum}</div>
                <div>Total places: {totalPlaces}</div>
            </div>
        );
    }
}
