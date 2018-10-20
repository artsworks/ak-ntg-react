import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimeTo extends Component {
    render() {
        const minutesTo = moment(this.props.time).diff(this.props.now, 'minutes');
        const secondsTo = moment(this.props.time).diff(this.props.now, 'seconds');
        const timeTo = `${minutesTo}m ${Math.abs(secondsTo - (minutesTo * 60))}s`;
        const highlight = secondsTo < 120;

        return (
            <div className={this.timeClassName(highlight)} key={timeTo}> {timeTo}</div>
        )
    }

    timeClassName(highlight) {
        let className = 'App__content-list-item-time';
        className += highlight ? ' App__content-list-item-time--highlight' : '';
        return className;
    }
}

TimeTo.propTypes = {
    time: PropTypes.string.isRequired,
    now: PropTypes.object.isRequired,
}

export default TimeTo;