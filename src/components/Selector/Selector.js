import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getSvg from '../../utils/getSvg';

class Selector extends Component {
    render() {
        return (
            <div className="App__content-selector">
                <div className={this.selectorClassName(0)} onClick={() => this.props.change(0)}>All</div>
                <div className={this.selectorClassName(1)} onClick={() => this.props.change(1)}>{getSvg(1)}</div>
                <div className={this.selectorClassName(3)} onClick={() => this.props.change(3)}>{getSvg(3)}</div>
                <div className={this.selectorClassName(2)} onClick={() => this.props.change(2)}>{getSvg(2)}</div>
            </div>
        );
    }

    selectorClassName(type) {
        const selectedClass = this.props.selected === type ? 'App__content-selector-item--is-selected' : '';
        return `App__content-selector-item ${selectedClass}`;
    }
}

Selector.propTypes = {
    selected: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired,
}

export default Selector;