import React, { Component } from 'react';

import config from '../config.js';

import Parking           from './Parking.jsx';;
import JoinParkingModal  from './JoinParkingModal.jsx';
import LeaveParkingModal from './LeaveParkingModal.jsx';

import styles from './App.less';

export default class App extends Component {
    state = {
        isJoinParkingModalShown: false,
        isLeaveParkingModalShown: false,
        carsAmount: { truck: 0, disabled: 0, sedan: 0 }
    };

    handleJoinParkingBtnClick = () => {
        this.setState({ isJoinParkingModalShown: true });
    };

    handleLeaveParkingBtnClick = () => {
        this.setState({ isLeaveParkingModalShown: true });
    };

    handleCarJoining = (carType) => {
        const carsAmountUpdatedState = this.state.carsAmount;

        carsAmountUpdatedState[carType] = this.state.carsAmount[carType] + 1;

        this.setState({
            isJoinParkingModalShown: false,
            carsAmount: carsAmountUpdatedState
        });
    };

    handleCarLeaving = (carType) => {
        const carsAmountUpdatedState = this.state.carsAmount;

        carsAmountUpdatedState[carType] = this.state.carsAmount[carType] - 1;

        this.setState({
            isLeaveParkingModalShown: false,
            carsAmount: carsAmountUpdatedState
        });
    };

    getFreePlaces = () => {
        const {
            truck,
            disabled,
            sedan
        } = this.state.carsAmount;

        return config.totalPlaces - truck - disabled - sedan;
    };

    getFreeTruckPlaces = () => {
        return config.truksPlacesMaximum - this.state.carsAmount.truck;
    };

    getFreeDisabledPlaces = () => {
        return config.disabledPlacesMaximum - this.state.carsAmount.disabled;
    };

    checkCanSedanJoinParking = () => {
        return this.getFreePlaces() - config.disabledPlacesMaximum > 0;
    };

    checkCanTruckJoinParking = () => {
        return this.getFreeTruckPlaces() > 0;
    };

    checkCanDisabledJoinParking = () => {
        return this.getFreePlaces() > 0;
    };

    checkCanSedanLeaveParking = () => {
        return this.state.carsAmount.sedan > 0;
    };

    checkCanTruckLeaveParking = () => {
        return this.state.carsAmount.truck > 0;
    };

    checkCanDisabledLeaveParking = () => {
        return this.state.carsAmount.disabled > 0;
    };

    render() {
        const {
            truksPlacesMaximum,
            disabledPlacesMaximum,
            totalPlaces
        } = config;

        const canSedanJoinParking = this.checkCanSedanJoinParking();
        const canTruckJoinParking = this.checkCanTruckJoinParking();
        const canDisabledJoinParking = this.checkCanDisabledJoinParking();

        const canSedanLeaveParking = this.checkCanSedanLeaveParking();
        const canTruckLeaveParking = this.checkCanTruckLeaveParking();
        const canDisabledLeaveParking = this.checkCanDisabledLeaveParking();

        console.log('canTruckLeaveParking', canTruckLeaveParking);

        return (
            <div className={styles.app} id='app'>
                <div onClick={this.handleJoinParkingBtnClick}>Join parking</div>
                <div onClick={this.handleLeaveParkingBtnClick}>Leave parking</div>
                <Parking
                    truksPlacesMaximum={truksPlacesMaximum}
                    disabledPlacesMaximum={disabledPlacesMaximum}
                    totalPlaces={totalPlaces}
                    carsAmount={this.state.carsAmount}
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
