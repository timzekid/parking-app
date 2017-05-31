import React, { Component } from 'react';

import * as labels from '../constants/Labels.js';

import Car from './Car.jsx';

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
                <div className={styles.trucksAmount}>Trucks amount: {trucks.length}</div>
                <div className={styles.disabledAmount}>Disabled amount: {disabled.length}</div>
                <div className={styles.sedansAmount}>Sedans amount: {sedans.length}</div>
                {
                    trucks.map(truck => {
                        return (
                            <Car
                                id = {truck.id}
                                timeOfArrival = {truck.timeOfArrival}
                                type={labels.TRUCK_CAR_LABEL}
                            />
                        );
                    })
                }
                {
                    disabled.map(disabledCar => {
                        return (
                            <Car
                                id = {disabledCar.id}
                                timeOfArrival = {disabledCar.timeOfArrival}
                                type={labels.DISABLED_CAR_LABEL}
                            />
                        );
                    })
                }
                {
                    sedans.map(sedan => {
                        return (
                            <Car
                                id = {sedan.id}
                                timeOfArrival = {sedan.timeOfArrival}
                                type={labels.SEDAN_CAR_LABEL}
                            />
                        );
                    })
                }
            </div>
        );
    }
}
