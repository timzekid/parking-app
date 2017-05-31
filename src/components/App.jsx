import React, { Component } from 'react';
import moment               from 'moment';

import config from '../config.js';

import Parking           from './Parking.jsx';
import JoinParkingModal  from './JoinParkingModal.jsx';
import LeaveParkingModal from './LeaveParkingModal.jsx';

import styles from './App.less';

export default class App extends Component {
    state = {
        isJoinParkingModalShown: false,
        isLeaveParkingModalShown: false,
        carsAmount: { truck: 0, disabled: 0, sedan: 0 },
        sedans: [],
        trucks: [],
        disabled: []
    };

    handleJoinParkingBtnClick = () => {
        this.setState({ isJoinParkingModalShown: true });
    };

    handleLeaveParkingBtnClick = () => {
        this.setState({ isLeaveParkingModalShown: true });
    };

    handleCarJoining = (carType) => {
        const updatedAmount = [ ...this.state[carType] ];

        updatedAmount.push({
            id: Date.now(),
            timeOfArrival: moment(new Date()).format('h:mm:ss')
        });

        this.setState({
            isJoinParkingModalShown: false,
            [carType]: updatedAmount
        });
    };

    handleCarLeaving = (carType) => {
        const updatedAmount = [ ...this.state[carType] ];

        updatedAmount.shift();

        this.setState({
            isLeaveParkingModalShown: false,
            [carType]: updatedAmount
        });
    };

    getFreePlaces = () => {
        const {
            trucks,
            disabled,
            sedans
        } = this.state;

        return config.totalPlaces - trucks.length - disabled.length - sedans.length;
    };

    getFreeTruckPlaces = () => {
        if (config.trucksPlacesMaximum === this.state.trucks.length) return 0;

        return this.getFreePlaces() - this.state.sedans.length + this.state.disabled.length;
    };

    getFreeDisabledPlaces = () => {
        return config.disabledPlacesMaximum - this.state.disabled.length;
    };

    checkCanSedanJoinParking = () => {
        return this.getFreePlaces() - this.getFreeDisabledPlaces() > 0;
    };

    checkCanTruckJoinParking = () => {
        return this.getFreeTruckPlaces() > 0;
    };

    checkCanDisabledJoinParking = () => {
        return this.getFreePlaces() > 0;
    };

    checkCanSedanLeaveParking = () => {
        return this.state.sedans.length > 0;
    };

    checkCanTruckLeaveParking = () => {
        return this.state.trucks.length > 0;
    };

    checkCanDisabledLeaveParking = () => {
        return this.state.disabled.length > 0;
    };

    render() {
        const {
            trucksPlacesMaximum,
            disabledPlacesMaximum,
            totalPlaces
        } = config;

        const canSedanJoinParking = this.checkCanSedanJoinParking();
        const canTruckJoinParking = this.checkCanTruckJoinParking();
        const canDisabledJoinParking = this.checkCanDisabledJoinParking();

        const canSedanLeaveParking = this.checkCanSedanLeaveParking();
        const canTruckLeaveParking = this.checkCanTruckLeaveParking();
        const canDisabledLeaveParking = this.checkCanDisabledLeaveParking();

        console.log('this.state', this.state);

        return (
            <div className={styles.app} id='app'>
                <div onClick={this.handleJoinParkingBtnClick}>Join parking</div>
                <div onClick={this.handleLeaveParkingBtnClick}>Leave parking</div>
                <Parking
                    trucksPlacesMaximum={trucksPlacesMaximum}
                    disabledPlacesMaximum={disabledPlacesMaximum}
                    totalPlaces={totalPlaces}
                    trucks={this.state.trucks}
                    sedans={this.state.sedans}
                    disabled={this.state.disabled}
                />

                {
                    this.state.isJoinParkingModalShown
                    ?
                        <JoinParkingModal
                            canSedanJoinParking={canSedanJoinParking}
                            canTruckJoinParking={canTruckJoinParking}
                            canDisabledJoinParking={canDisabledJoinParking}
                            onCarTypeSelect={this.handleCarJoining}
                        />
                    :
                        null
                }
                {
                    this.state.isLeaveParkingModalShown
                    ?
                        <LeaveParkingModal
                            canSedanLeaveParking={canSedanLeaveParking}
                            canTruckLeaveParking={canTruckLeaveParking}
                            canDisabledLeaveParking={canDisabledLeaveParking}
                            onCarTypeSelect={this.handleCarLeaving}
                        />
                    :
                        null
                }
            </div>
        );
    }
}
