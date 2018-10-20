import React from 'react';
import PropTypes from 'prop-types';

function Message(props) {
    return props.text ? (<div className="App__content-message">{props.text}</div>) : '';
}

Message.propTypes = {
    text: PropTypes.string,
}

export default Message;