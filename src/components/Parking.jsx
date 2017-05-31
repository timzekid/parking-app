import React, { Component } from 'react';

import styles from './Parking.less';

export default class Parking extends Component {
    render() {
        const {
            truksPlacesMaximum,
            disabledPlacesMaximum,
            totalPlaces,
            carsAmount
        } = this.props;

        return (
            <div>
                <div>Maximum places for truks: {truksPlacesMaximum}</div>
                <div>Maximum places for disabled: {disabledPlacesMaximum}</div>
                <div>Total places: {totalPlaces}</div>
                <div>Trucks amount: {carsAmount.truck}</div>
                <div>Disabled amount: {carsAmount.disabled}</div>
                <div>Sedans amount: {carsAmount.sedan}</div>
            </div>
        );
    }
}
