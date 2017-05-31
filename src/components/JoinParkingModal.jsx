import React, { Component, PropTypes } from 'react';
import cx                              from 'classnames';

import * as labels from '../constants/Labels.js';

import styles from './JoinParkingModal.less';

export default class JoinParkingModal extends Component {
    static propTypes = {
        canTruckJoingParking: PropTypes.bool.isRequired,
        canSedanJoingParking: PropTypes.bool.isRequired,
        canDisabledJoingParking: PropTypes.bool.isRequired,
        onCarTypeSelect: PropTypes.func.isRequired
    };

    render() {
        const truckBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !this.props.canTruckJoingParking
        });
        const sedanBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !this.props.canSedanJoingParking
        });
        const disabledBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !this.props.canDisabledJoingParking
        });

        return (
            <div className={styles.modal}>
                <h3>What type of car do you have?</h3>
                <div
                    className={truckBtnClasses}
                    onClick={this.props.onCarTypeSelect.bind(null, labels.TRUCK_CAR_LABEL)}
                >
                    Truck
                </div>
                <div
                    className={sedanBtnClasses}
                    onClick={this.props.onCarTypeSelect.bind(null, labels.SEDAN_CAR_LABEL)}
                >
                    Sedan
                </div>
                <div
                    className={disabledBtnClasses}
                    onClick={this.props.onCarTypeSelect.bind(null, labels.DISABLED_CAR_LABEL)}
                >
                    I am disabled person
                </div>
            </div>
        );
    }
}
