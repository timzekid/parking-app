import React, { Component, PropTypes } from 'react';
import cx                              from 'classnames';

import * as labels from '../constants/Labels.js';

import styles from './JoinParkingModal.less';

export default class JoinParkingModal extends Component {
    static propTypes = {
        canTruckJoinParking: PropTypes.bool.isRequired,
        canSedanJoinParking: PropTypes.bool.isRequired,
        canDisabledJoinParking: PropTypes.bool.isRequired,
        onCarTypeSelect: PropTypes.func.isRequired
    };

    render() {
        const {
            canTruckJoinParking,
            canSedanJoinParking,
            canDisabledJoinParking,
            onCarTypeSelect
        } = this.props;

        const truckBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !canTruckJoinParking
        });
        const sedanBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !canSedanJoinParking
        });
        const disabledBtnClasses = cx(styles.carTypeBtn, {
            [styles.carTypeBtnDisabled]: !canDisabledJoinParking
        });

        return (
            <div className={styles.modal}>
                <h3>What type of car do you have?</h3>
                <div
                    className={truckBtnClasses}
                    onClick={
                        canTruckJoinParking
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
                        canSedanJoinParking
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
                        canDisabledJoinParking
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
