import React, { Component, PropTypes } from 'react';

import * as labels from '../constants/Labels.js';

import styles from './JoinParkingModal.less';

export default class JoinParkingModal extends Component {
    static propTypes = {
        onCarTypeSelect: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className={styles.modal}>
                <h3>What type of car do you have?</h3>
                <div onClick={this.props.onCarTypeSelect.bind(null, labels.TRUCK_CAR_LABEL)}>Truck</div>
                <div onClick={this.props.onCarTypeSelect.bind(null, labels.SEDAN_CAR_LABEL)}>Sedan</div>
                <div onClick={this.props.onCarTypeSelect.bind(null, labels.DISABLED_CAR_LABEL)}>
                    I am disabled person
                </div>
            </div>
        );
    }
}
