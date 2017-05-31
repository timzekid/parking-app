import React, { Component, PropTypes } from 'react';
import cx                              from 'classnames';

import * as labels from '../constants/Labels.js';

import styles from './LeaveParkingModal.less';

export default class LeaveParkingModal extends Component {
    static propTypes = {
        canTruckLeaveParking: PropTypes.bool.isRequired,
        canSedanLeaveParking: PropTypes.bool.isRequired,
        canDisabledLeaveParking: PropTypes.bool.isRequired,
        onCarTypeSelect: PropTypes.func.isRequired
    };

    render() {
        const truckBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !this.props.canTruckLeaveParking
        });
        const sedanBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !this.props.canSedanLeaveParking
        });
        const disabledBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !this.props.canDisabledLeaveParking
        });

        return (
            <div className={styles.modal}>
                <h3>What type of car have you left here?</h3>
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
