import React, { Component } from 'react';

import styles from './Parking.less';

export default class Parking extends Component {
    render() {
        const {
            trucksPlacesMaximum,
            disabledPlacesMaximum,
            totalPlaces,
            trucks,
            disabled,
            sedans
        } = this.props;

        return (
            <div>
                <div>Maximum places for trucks: {trucksPlacesMaximum}</div>
                <div>Maximum places for disabled: {disabledPlacesMaximum}</div>
                <div>Total places: {totalPlaces}</div>
                <div>Trucks amount: {trucks.length}</div>
                <div>Disabled amount: {disabled.length}</div>
                <div>Sedans amount: {sedans.length}</div>
                {

                }
            </div>
        );
    }
}
