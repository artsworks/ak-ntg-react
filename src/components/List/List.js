import React from 'react';
import PropTypes from 'prop-types';
import TimeTo from '../TimeTo/TimeTo';
import getSvg from '../../utils/getSvg';

function List(props) {
    return (
        <div className="App__content-list">
            {props.races.map(race =>
                <div className="App__content-list-item" key={race.id}>
                    <div className="App__content-list-item-logo">{getSvg(race.type)}</div>
                    <div className="App__content-list-item-race">
                        <p>{race.name}</p>
                        <p className="App__content-list-item-race-no">Race {race.number}</p>
                    </div>
                    <TimeTo time={race.time} now={props.now}></TimeTo>
                </div>
            )}
        </div>
    );
}


List.propTypes = {
    races: PropTypes.array.isRequired,
    now: PropTypes.object.isRequired,
}

export default List;