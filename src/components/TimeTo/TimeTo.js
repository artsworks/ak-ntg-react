import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimeTo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlight: false,
            timeTo: '0m 0s'
        };
    }

    componentDidMount() {
        const minutesTo = moment(this.props.time).diff(this.props.now, 'minutes');
        const secondsTo = moment(this.props.time).diff(this.props.now, 'seconds');
        const highlight = secondsTo < 120;
        this.setState({
            highlight,
            timeTo: `${minutesTo}m ${secondsTo - (minutesTo * 60)}s`
        });
    }

    render() {
        return (
            <div className={this.timeClassName()} key={this.state.timeTo}> {this.state.timeTo}</div>
        )
    }

    timeClassName() {
        return `App__content-list-item-time ${this.state.highlight ? 'App__content-list-item-time--highlight' : ''}`;
    }
}

TimeTo.propTypes = {
    time: PropTypes.string.isRequired,
    now: PropTypes.object.isRequired,
}

export default TimeTo;