import React, { Component } from 'react';

import config from '../config.js';

import Parking          from './Parking.jsx';
import JoinParkingModal from './JoinParkingModal.jsx';

import styles from './App.less';

export default class App extends Component {
    state = {
        isJoinParkingModalShown: false,
        carsAmount: { truck: 0, disabled: 0, sedan: 0 }
    };

    handleJoinParkingBtnClick = () => {
        this.setState({ isJoinParkingModalShown: true });
    };

    handleCarJoining = (carType) => {
        const carsAmountUpdatedState = this.state.carsAmount;

        carsAmountUpdatedState[carType] = this.state.carsAmount[carType] + 1;

        this.setState({
            isJoinParkingModalShown: false,
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

    render() {
        const {
            truksPlacesMaximum,
            disabledPlacesMaximum,
            totalPlaces
        } = config;

        const canSedanJoingParking = this.checkCanSedanJoinParking();
        const canTruckJoingParking = this.checkCanTruckJoinParking();
        const canDisabledJoingParking = this.checkCanDisabledJoinParking();

        return (
            <div className={styles.app} id='app'>
                <div onClick={this.handleJoinParkingBtnClick}>Join parking</div>
                <Parking
                    truksPlacesMaximum={truksPlacesMaximum}
                    disabledPlacesMaximum={disabledPlacesMaximum}
                    totalPlaces={totalPlaces}
                    carsAmount={this.state.carsAmount}
                />

                {
                    this.state.isJoinParkingModalShown
                    ?
                        <JoinParkingModal onCarTypeSelect={this.handleCarJoining} />
                    :
                        null
                }
            </div>
        );
    }
}
