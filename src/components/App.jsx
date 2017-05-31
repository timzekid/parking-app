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
        sedans: [],
        trucks: [],
        disabled: []
    };

    componentDidMount() {
        const localSedansInfo = JSON.parse(localStorage.getItem('sedans'));
        const localTrucksInfo = JSON.parse(localStorage.getItem('trucks'));
        const localDisabledInfo = JSON.parse(localStorage.getItem('disabled'));

        if (localSedansInfo) {
            this.setState({ sedans: localSedansInfo });
        }
        if (localTrucksInfo) {
            this.setState({ trucks: localTrucksInfo });
        }
        if (localDisabledInfo) {
            this.setState({ disabled: localDisabledInfo });
        }
    }

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
        }, this._updateLocalStorage);
    };

    handleCarLeaving = (carType) => {
        const updatedAmount = [ ...this.state[carType] ];

        updatedAmount.shift();

        this.setState({
            isLeaveParkingModalShown: false,
            [carType]: updatedAmount
        }, this._updateLocalStorage);
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

    _updateLocalStorage = () => {
        const sedans = JSON.stringify(this.state.sedans);
        const trucks = JSON.stringify(this.state.trucks);
        const disabled = JSON.stringify(this.state.disabled);

        localStorage.setItem('sedans', sedans);
        localStorage.setItem('trucks', trucks);
        localStorage.setItem('disabled', disabled);
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

        return (
            <div className={styles.app} id='app'>
                <div
                    className={styles.joinBtn}
                    onClick={this.handleJoinParkingBtnClick}
                >
                    Join parking
                </div>
                <div
                    className={styles.leaveBtn}
                    onClick={this.handleLeaveParkingBtnClick}
                >
                    Leave parking
                </div>
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
