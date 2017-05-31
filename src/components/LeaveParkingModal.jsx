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
        const {
            canTruckLeaveParking,
            canSedanLeaveParking,
            canDisabledLeaveParking,
            onCarTypeSelect
        } = this.props;

        const truckBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !canTruckLeaveParking
        });
        const sedanBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !canSedanLeaveParking
        });
        const disabledBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !canDisabledLeaveParking
        });

        return (
            <div className={styles.modal}>
                <h3>What type of car have you left here?</h3>
                <div
                    className={truckBtnClasses}
                    onClick={
                        canTruckLeaveParking
                        ?
                            onCarTypeSelect.bind(null, labels.TRUCK_CAR_LABEL)
                        :
                            null
                        }
                >
                    Truck
                </div>
                <div
                    className={sedanBtnClasses}
                    onClick={
                        canSedanLeaveParking
                        ?
                            onCarTypeSelect.bind(null, labels.SEDAN_CAR_LABEL)
                        :
                            null
                        }
                >
                    Sedan
                </div>
                <div
                    className={disabledBtnClasses}
                    onClick={
                        canDisabledLeaveParking
                        ?
                            onCarTypeSelect.bind(null, labels.DISABLED_CAR_LABEL)
                        :
                            null
                        }
                >
                    I am disabled person
                </div>
            </div>
        );
    }
}
