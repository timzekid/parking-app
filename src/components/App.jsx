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

    render() {
        const {
            truksPlacesMaximum,
            disabledPlacesMaximum,
            totalPlaces
        } = config;

        return (
            <div className={styles.app} id='app'>
                <div onClick={this.handleJoinParkingBtnClick}>Join parking</div>
                <Parking
                    truksPlacesMaximum={truksPlacesMaximum}
                    disabledPlacesMaximum={disabledPlacesMaximum}
                    totalPlaces={totalPlaces}
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
