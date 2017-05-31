import React, { Component, PropTypes } from 'react';
import cx                   from 'classnames';

import * as labels from '../constants/Labels.js';

import styles from './Car.less';

export default class Car extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        timeOfArrival: PropTypes.number
    };

    render() {
        const {
            type,
            timeOfArrival
        } = this.props;

        const carClasses = cx(styles.car, {
            [styles.sedan]: type === labels.SEDAN_CAR_LABEL,
            [styles.truck]: type === labels.TRUCK_CAR_LABEL,
            [styles.disabled]: type === labels.DISABLED_CAR_LABEL
        });

        return (
            <div className={carClasses}>
                Arrived at {timeOfArrival} hours
            </div>
        );
    }
}
